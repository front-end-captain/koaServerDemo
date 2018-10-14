const Koa = require("koa");
const Chalk = require("chalk");
const NodeSchedule = require("node-schedule");
const Logger = require("koa-morgan");
const Cors = require("koa-cors");
const KoaBody = require("koa-body");
const {
  ConnectDBMiddleware,
  BackupDatabaseMiddleware,
  HandleErrorMiddleware,
} = require("./Middleware/index.js");
const router = require("./Router/index.js");

const PORT = 3000;
const app = new Koa();

ConnectDBMiddleware();
NodeSchedule.scheduleJob("0 50 11 ** 7", () => {
  BackupDatabaseMiddleware();
});

app
  .use(Logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
  .use(KoaBody())
  .use(HandleErrorMiddleware())
  .use(Cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(Chalk.red(`The server is listen at ${PORT}`));
});

module.exports = app;
