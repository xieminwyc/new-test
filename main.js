#!/usr/bin/env node

import {
  $,
  fs,
  path,
  spinner,
  chalk,
  sleep,
  echo,
  glob,
  usePowerShell,
  usePwsh,
  which,
} from "zx";
import { select, input, confirm } from "@inquirer/prompts";
import { Command } from "commander";
import ejs from "ejs";
import AdmZip from "adm-zip";
import { fileURLToPath } from "url";
// console.log("Hello, world!", import.meta.dirname, import.meta.url);
// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// usePwsh();

console.log("Hello, world!", __dirname, import.meta.url);
// const pkgJson = fs.readJSONSync(
//   path.join(import.meta.dirname, "./package.json")
// );

// 读取 package.json 文件
const pkgJson = fs.readJSONSync(path.join(__dirname, "./package.json"));
// console.log(pkgJson);
const program = new Command();

program
  .name("zx-cli")
  .description("使用zx编写一个简易的CLI")
  .version(pkgJson.version);

program
  .command("create")
  .description("创建项目")
  .action(() => {
    console.log("创建项目wwwww");
    create();
  });

program.parse();

// #endregion zx-command

const originProject = {
  "v3-admin-vite": {
    url: "https://gitee.com/un-pany/v3-admin-vite.git",
    zipUrl:
      "https://gitee.com/un-pany/v3-admin-vite/repository/archive/main.zip",
  },
};

// #region zx-create

async function create() {
  let projectName = "";
  while (!projectName) {
    // input
    // projectName = await question('请输入项目名：');
    projectName = await input({ message: "请输入项目名：" });
  }
  // select 选择项目模板
  const projectTemplate = await select({
    message: "请选择项目模版",
    choices: [
      {
        name: "vue 项目",
        value: "template-vue",
      },
      {
        name: "vue-ts 项目",
        value: "template-vue-ts",
      },
      {
        name: "v3-admin-vite（远程）",
        value: "v3-admin-vite",
      },
    ],
  });

  // 目标路径
  const targetPath = path.join(process.cwd(), projectName);
  console.log(targetPath, projectName, projectTemplate);
  // 判断目录是否为空
  if (fs.existsSync(targetPath)) {
    const empty = await confirm({ message: "该目录不为空，是否清空" });
    if (empty) {
      // 清空文件夹
      fs.removeSync(targetPath);
    } else {
      process.exit(1);
    }
  }
  // 是否选择本地模板
  if (!originProject[projectTemplate]) {
    const templatePath = path.join(
      __dirname,
      `template/${projectTemplate}/template`
    );
    console.log(templatePath, targetPath, projectTemplate);
    await spinner("创建项目...", async () => {
      fs.copySync(templatePath, targetPath);
      // 把ejs模板渲染一下
      // 使用glob获取目标路径下的所有文件（忽略node_modules目录）
      const files = await glob("**", {
        cwd: targetPath,
        onlyFiles: true,
        ignore: ["node_modules/**"],
      });

      for (let i = 0; i < files.length; i++) {
        const filePath = path.join(targetPath, files[i]);
        // 使用ejs模板引擎渲染文件内容，传入projectName变量
        const renderResult = await ejs.renderFile(filePath, {
          projectName,
        });
        // 将渲染后的内容写回到文件中
        fs.writeFileSync(filePath, renderResult);
      }
      // 太快了，看不到loading效果
      await sleep(1000);
    });
  } else {
    // git clone
    // await gitClone({ projectName, projectTemplate });
    // 下载zip
    // const zipPath = path.join(targetPath, "main.zip");
    // console.log("下载zip", originProject[projectTemplate].zipUrl);
    await downloadFile({ projectName, projectTemplate });
  }

  echo(chalk.green("项目创建成功"));
  echo(`cd ${projectName}\nnpm install\nnpm run dev`);
}

// git clone
async function gitClone({ projectName, projectTemplate }) {
  const isGit = await which("git").catch(() => false);
  if (!isGit) {
    echo(chalk.red("请安装git"));
    process.exit(1);
  }
  await spinner(chalk.green("clone..."), async () => {
    try {
      $.verbose = false;
      await $`git clone ${originProject[projectTemplate].url} ${projectName}`;
    } catch (error) {
      echo(chalk.red(`clone失败: ${error}`));
      process.exit(1);
    }
  });
}

// fetch zip
async function downloadFile({ projectName, projectTemplate }) {
  const projectPath = path.join(process.cwd(), projectName);
  await spinner("下载中...", async () => {
    try {
      $.verbose = false;
      const res = await fetch(originProject[projectTemplate].zipUrl);
      const buf = await res.arrayBuffer();
      console.log(res, buf, "resssss");
      fs.writeFileSync(projectPath + ".zip", Buffer.from(buf));
    } catch (error) {
      echo(chalk.red(`下载失败: ${error}`));
      process.exit(1);
    }
  });

  await spinner("解压...", async () => {
    try {
      const zipUrl = `${projectPath}.zip`;
      var zip = new AdmZip(zipUrl);

      const mainEntry = zip.getEntries()[0].entryName;
      zip.extractAllTo(projectPath, true);
      const targetPath = path.join(projectPath, mainEntry);
      fs.copySync(targetPath, projectPath, {
        overwrite: true,
      });
      fs.removeSync(zipUrl);
    } catch (error) {
      echo(chalk.red(`解压失败: ${error}`));
      process.exit(1);
    }
  });
}

// export function someFunction() {
//   console.log("Hello from test!");
// }
