const { Log } = require("./../Modal/index.js");

const getLog = async (context) => {
  const logData = await Log.find({});
  context.status = 200;
  context.body = { code: 1, data: logData };
};

module.exports = getLog;
