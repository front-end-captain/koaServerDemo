const uuidv1 = require("uuid/v1");
const { User, Log, Token } = require("./../Modal/index.js");
const { createToken } = require("./../Utils/Token.js");

const register = async (ctx) => {
  const { body } = ctx.request;
  const { username, password } = body;
  if (!username || !password) {
    return (ctx.body = { code: -1, message: "用户名或者密码不能为空" });
  }

  const findUser = await User.find({ name: username });
  if (findUser.length !== 0) {
    return (ctx.body = { code: -1, message: "该用户已经注册" });
  }

  const newUser = new User({
    id: uuidv1(),
    name: username,
    password,
  });
  await newUser.save();
  const log = new Log({
    type: 2,
    description: "user register success",
    log: `user register success, the user is ${username}`,
  });
  await log.save();
  ctx.body = { code: 1, message: "注册成功" };
};

const login = async (ctx) => {
  const { body } = ctx.request;
  const { username, password } = body;

  if (!username || !password) {
    return (ctx.body = { code: -1, message: "用户名或者密码不能为空" });
  }

  const targetUser = await User.findOne({ name: username });
  if (!targetUser) {
    return (ctx.body = { code: -1, message: "该用户还没有注册" });
  }

  const newToken = createToken();
  const { id, name } = targetUser;

  const targetToken = await Token.findOne({ id });
  if (!targetToken) {
    const token = new Token({
      id,
      token: newToken,
    });
    await token.save();
  } else {
    await Token.updateOne({ id }, { id, token: newToken });
  }

  const log = new Log({
    type: 2,
    description: "user login success",
    log: `user login success, the user is ${username}`,
  });
  await log.save();
  ctx.body = {
    code: 1,
    message: "登录成功",
    data: { id, username: name, token: newToken },
  };
};

module.exports = {
  register,
  login,
};
