// #!/usr/bin/env zx # 使脚本可执行

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
} from "zx";

const ejs = require("ejs");
const fs = require("fs");
// // 示例数据
// const data = {
//   title: "EJS 示例",
//   message: "你好，世界！",
// };

// // 示例模板字符串
// const str = `
//   <html>
//     <head>
//       <title><%= title %></title>
//     </head>
//     <body>
//       <h1><%= message %></h1>
//     </body>
//   </html>
// `;

// // 编译模板
// let template = ejs.compile(str);
// let html = template(data);
// console.log(html);
// // => 渲染后的 HTML 字符串

// // 直接渲染模板字符串
// let renderedHtml = ejs.render(str, data);
// console.log(renderedHtml);
// // => 渲染后的 HTML 字符串

// 自定义文件加载函数
let myFileLoad = function (filePath) {
  return "myFileLoad: " + fs.readFileSync(filePath, "utf8");
};

// 设置自定义文件加载函数
ejs.fileLoader = myFileLoad;

// 示例数据
const data = {
  title: "EJS 示例",
  message: "你好，世界！",
};

// 使用自定义文件加载函数渲染文件中的模板
const filename = "template.ejs"; // 假设文件 template.ejs 存在并包含模板内容
ejs.renderFile(filename, data, {}, function (err, str) {
  if (err) {
    console.error(err);
  } else {
    console.log(str);
    // => 渲染后的 HTML 字符串
  }
});
