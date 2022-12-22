const jwt = require("jsonwebtoken");
const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const { PUBLIC_KEY } = require("../app/config");

// 登录账号密码校验
const verifyLogin = async (ctx, next) => {
  console.log("账号密码校验的middleware~");

  // 1.获取用户名和密码
  const { userId, passWord } = ctx.request.body;

  // 2.判断用户名和密码是否为空
  if (!userId || !passWord) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 3.判断用户是否存在的
  const result = await userService.getUserById(userId);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 4.判断密码是否和数据库中的密码是一致(加密)
  // if (md5password(passWord) !== user.passWord) {
  //   const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
  //   return ctx.app.emit("error", error, ctx);
  // }

  ctx.user = user;
  console.log(`${user.userId} 通过用户账号密码校验`);
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    console.log("通过验证token的middleware~");
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
