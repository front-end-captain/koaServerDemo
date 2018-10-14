const Router = require("koa-router");
const { LogController, AdminController } = require("./../Controllers/index.js");

const router = new Router({ prefix: "/" });

router.get('log', LogController);
router.get("admin", AdminController)

module.exports = router;
