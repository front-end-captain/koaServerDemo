const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const user = mongoose.model('user', User);

module.exports = user;
