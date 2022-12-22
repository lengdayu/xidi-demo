const Router = require("koa-router");
const userRouter = new Router({ prefix: "/user" });

//中间件处理
const { verifyAuth } = require("../middleware/auth.middleware");
const { avatarHandler } = require("../middleware/file.middleware");

const {
  userDetail,
  create,
  avatarInfo,
} = require("../controller/user.controller");
const { saveAvatarInfo } = require("../controller/file.controller");

userRouter.post("/create", create); //创建用户
userRouter.get("/detail", verifyAuth, userDetail); //查询用户信息
userRouter.post("/updateAvatar", verifyAuth, avatarHandler, saveAvatarInfo); //创建用户头像
userRouter.get("/:userId/avatar", verifyAuth, avatarInfo); //查询用户头像

module.exports = userRouter;
