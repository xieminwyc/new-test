const AdmZip = require("adm-zip");
const OriginalFs = require("original-fs");

// reading archives
// const zip = new AdmZip("./myTest.zip", { fs: OriginalFs });
// var zipEntries = zip.getEntries(); // an array of ZipEntry records - add password parameter if entries are password protected

// zipEntries.forEach(function (zipEntry) {
//   console.log(zipEntry.toString()); // outputs zip entries information
//   if (zipEntry.entryName == "myTest/my_file.txt.txt") {
//     console.log(zipEntry.getData().toString("utf8"));
//   }
// });
// console.log(zip.readAsText("myTest/my_file.txt.txt"), "12");
// zip.extractEntryTo(
//   /*entry name*/ "myTest/my_file.txt.txt",
//   /*target path*/ "D:/test",
//   /*maintainEntryPath*/ false,
//   /*overwrite*/ true
// );
// extracts everything
// zip.extractAllTo(/*target path*/ "D:/test", /*overwrite*/ true);
// creating archives
var zip = new AdmZip();

// add file directly
var content = "inner content of the file";
zip.addFile(
  "test1.txt",
  Buffer.from(content, "utf8"),
  "entry comment goes here"
);
// add local file
zip.addLocalFile("D:/test/my_file.txt.txt");
// get everything as a buffer
var willSendthis = zip.toBuffer();
// or write everything to disk
zip.writeZip(/*target file name*/ "D:/test/example.zip");
