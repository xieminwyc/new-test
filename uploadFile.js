import { $, fs, path, glob } from "zx";
import axios from "axios";
import FormData from "form-data";
import { fileURLToPath, URL } from "url";
import { select, input, confirm } from "@inquirer/prompts";
import { Command } from "commander";

const _filename = fileURLToPath(new URL(import.meta.url));
const _dirname = path.dirname(_filename);

// 定义图片文件夹和输出文件路径
const imageDir = path.join(_dirname, "ImagesToUpload");
const outputFile = path.join(imageDir, "upload_log.txt");

console.log(imageDir, "imageDir");

// 打印目录中的文件
const filesInDir = fs.readdirSync(imageDir);
console.log(filesInDir, "目录中的文件");

// 登录获取 Token
async function login() {
  const loginUrl = "https://table-api.xironiot.com/api/auth/admin_login/";
  const credentials = {
    username: "test0909",
    password: "Test0909",
  };

  try {
    const response = await axios.post(loginUrl, credentials, {
      headers: {
        "Xi-App-Id": "0a60f00b28c849d3ac529994f98b825f",
      },
    });
    // console.log(response, "response");
    return response.data.Result.token;
  } catch (error) {
    console.error("登录失败:", error.response?.data || error.message);
    throw error;
  }
}

// 上传图片
async function uploadImage(filePath, token) {
  // 检查文件大小
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileSizeInKilobytes = fileSizeInBytes / 1024;
  console.log(fileSizeInKilobytes, "fileSizeInKilobytes");
  if (fileSizeInKilobytes > 100) {
    const userConfirmed = await confirm({
      message: `${path.basename(
        filePath
      )}的文件大小为 ${fileSizeInKilobytes.toFixed(2)}KB,是否继续上传？`,
    });

    if (!userConfirmed) {
      console.log("用户取消上传");
      return;
    }
  }
  const uploadUrl = "https://table-file.xironiot.com/table/upload/";

  // 创建 FormData 对象
  const formData = new FormData();
  formData.append(
    "file",
    fs.createReadStream(filePath),
    path.basename(filePath)
  );
  const Authorization = "Motern " + token;
  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        Authorization: Authorization,
        "Xi-App-Id": "0a60f00b28c849d3ac529994f98b825f",
      },
    });
    return response.data;
  } catch (error) {
    console.error("上传失败:", error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  // 确保目录存在
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  console.log(`正在搜索目录: ${imageDir}`);

  // 获取所有图片文件
  const files = await glob(
    `${imageDir.replace(/\\/g, "/")}/*.{jpg,jpeg,png,gif}`
  );
  console.log(files, `找到 ${files.length} 张图片`);

  // 登录获取 Token
  const token = await login();
  console.log("登录成功，获取到 Token:", token);

  // 存储所有 URL
  const uploadResults = [];

  for (const file of files) {
    // 上传图片并获取处理后的 URL
    const url = await uploadImage(file, token);
    console.log(`上传成功: ${file} -> ${url}`);
    if (!url) {
      continue;
    }

    uploadResults.push({
      name: path.basename(file),
      url: url,
    });
    // 删除上传成功的图片文件
    fs.unlinkSync(file);
  }

  console.log(uploadResults, "urls");

  // 将结果写入文件
  fs.writeFileSync(outputFile, JSON.stringify(uploadResults, null, 2), "utf-8");

  console.log(`上传成功的图片已删除,URL 已写入 ${outputFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
