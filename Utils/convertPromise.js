
/**
 *
 * TODO use custom Promise
 * @param {Function} method
 */
const thenable = (method) => {
  return (path, options) => {
    const rest = typeof options === "string" ? options : { ...options };
    return new Promise((resolve, reject) => {
      method(path, rest, (error, data) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      });
    });
  };
};

const fs = require("fs");
const path = require("path");

const readFile = thenable(fs.readFile);
readFile(path.resolve(__dirname, "./Token.js"), "utf8").then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  },
);

const readDir = thenable(fs.readdir);
readDir(path.resolve(__dirname, "./../Utils"), "utf8").then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  },
);

const asyncMethod = (num, options, callback) => {
  setTimeout(() => {
    callback(num * 10);
  }, 1000);
};
const asyncMethodPromise = thenable(asyncMethod);
asyncMethodPromise(10, "utf8").then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  },
);

module.exports = thenable;
