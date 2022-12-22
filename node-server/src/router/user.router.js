const Router = require("koa-router");
const userRouter = new Router();

//中间件处理
const { verifyAuth } = require("../middleware/auth.middleware");

const { userDetail, create } = require("../controller/user.controller");

userRouter.post("/user/create", create);
userRouter.get("/user/detail", verifyAuth, userDetail);

module.exports = userRouter;
