const { Admin } = require("./../Modal/index.js");

const getAdmin = async (context) => {
  const adminData = await Admin.find({});
  context.status = 200;
  context.body = { code: 1, data: adminData };
};

module.exports = getAdmin;
