const Router = require("koa-router");
const authRouter = new Router();

//中间件处理
const { verifyLogin } = require("../middleware/auth.middleware");

//逻辑处理部分
const { login } = require("../controller/auth.controller");

authRouter.post("/login", verifyLogin, login);

module.exports = authRouter;
