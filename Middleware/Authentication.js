const { checkToken } = require("./../Utils/Token.js");

const whiteList = ['/register', '/login'];
const checkList = ['/log'];

const authentication = () => {
  return async (ctx, next) => {
    const { header, path } = ctx;
    const { authorization } = header;

    // 请求路径在检查列表中同时不在白名单中 对 token 进行校验
    if (checkList.includes(path) && !whiteList.includes(path)) {
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
