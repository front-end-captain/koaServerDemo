const { Log } = require("./../Modal/index.js");

const NotFund = () => {
  return async (ctx, next) => {
    await next();

    if (ctx.status === 404) {
      const log = new Log({
        type: 2,
        description: '404 not fund',
        log: `404 not fund, the request url is ${ctx.url}`,
      });
      await log.save();
      ctx.status = 404;
      ctx.body = { code: -1, message: "the request url is not fund" };
    }
  };
};

module.exports = NotFund;
