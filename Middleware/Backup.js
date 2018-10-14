const path = require("path");
const { Log, Mongo } = require("./../Modal/index.js");
const DBConfig = require("./../Config/DBConfig.js");
const { execCommand, handleZip } = require("./../Utils/File.js");

const backup = async () => {
  const { host, db } = DBConfig;
  const dbPathFolder = path.resolve(process.cwd(), "databaseBackup");
  const dbFolder = String(Date.now());
  const dbPath = path.join(dbPathFolder, dbFolder);

  await execCommand(`mongodump -h ${host} -d ${db} -o ${dbPath}`);
  await handleZip(dbPath);

  const mongo = new Mongo({
    path: dbPath,
    filename: dbFolder + ".zip",
  });
  await mongo.save();

  const log = new Log({
    type: 2,
    description: "database backup success!",
    log: "database backup success",
  });
  await log.save();
};

module.exports = backup;
