var fs = require("fs");

var archiver = require("archiver");

var output = fs.createWriteStream(__dirname + "/example-output.zip");
var archive = archiver("zip");

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(
    "archiver has been finalized and the output file descriptor has closed.",
  );
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

var file1 = __dirname + "/fixtures/file1.txt";
var file2 = __dirname + "/fixtures/file2.txt";

archive
  .append(fs.createReadStream(file1), { name: "file1.txt" })
  .append(fs.createReadStream(file2), { name: "file2.txt" })
  .finalize();
