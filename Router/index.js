const Router = require("koa-router");
const { LogController, UserController } = require("./../Controllers/index.js");

const router = new Router({ prefix: "/" });

router.get('log', LogController);
router.post('register', UserController.register);
router.post('login', UserController.login);

module.exports = router;
