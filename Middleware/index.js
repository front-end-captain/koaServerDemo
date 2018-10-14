const ConnectDBMiddleware = require("./ConnectDB.js");
const BackupDatabaseMiddleware = require("./Backup.js");
const HandleErrorMiddleware = require("./HandleError.js");

module.exports = {
  ConnectDBMiddleware,
  BackupDatabaseMiddleware,
  HandleErrorMiddleware,
};
