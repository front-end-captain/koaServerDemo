const fs = require("fs");
const { exec } = require("child_process");
const archiver = require("archiver");
const chalk = require("chalk");

const handleZip = async (dbPath) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(dbPath + ".zip");
    const archive = archiver("zip");

    output.on("close", () => {
      resolve();
    });

    output.on("end", () => {
      resolve();
    });

    output.on("error", (error) => {
      reject(error);
    });
    archive.pipe(output);
    archive.directory(dbPath + "/", false);
    archive.finalize();
  });
};

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        console.error(chalk.red(error));
        reject(err);
        return;
      }
      resolve(stdout);
    })
  });
};

module.exports = {
  handleZip,
  execCommand,
};
