import { Command } from "commander";

const program = new Command();

program
  .option("--first")
  .option("-s, --separator <char>")
  .argument("<string>", "string to split");

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;
console.log(program.args[0].split(options.separator, limit));

// usePowerShell(); // Use PowerShell.exe

// // 使用 PowerShell 的 Get-ChildItem 命令
// const list = await $`Get-ChildItem -Force`;
// console.log("Files in current directory:", list);
// const dir = await $`Get-Location`;
// console.log("Current directory:", dir);
