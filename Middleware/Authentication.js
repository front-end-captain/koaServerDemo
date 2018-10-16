const { checkToken } = require("./../Utils/Token.js");

const whiteList = ['/register', '/login'];

const authentication = () => {
  return async (ctx, next) => {
    const { header, path } = ctx;
    const { authorization } = header;
    if (!whiteList.includes(path)) {
      const isTokenValidate = await checkToken(authorization);
      if (!isTokenValidate) {
        ctx.status = 401;
        return ctx.body = { code: -1, message: 'need authorization' };
      }
    }
    await next();
  };
};

module.exports = authentication;
