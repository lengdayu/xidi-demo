const Router = require("koa-router");
const authRouter = new Router();

//中间件处理
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

//逻辑处理部分
const { login } = require("../controller/auth.controller");
const { userDetail } = require("../controller/user.controller");

authRouter.post("/login", verifyLogin, login);
authRouter.get("/user/detail", verifyAuth, userDetail);

module.exports = authRouter;
