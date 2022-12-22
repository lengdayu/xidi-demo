const Router = require("koa-router");
const commodity = new Router({ prefix: "/commodity" });

//中间件处理
const { verifyAuth } = require("../middleware/auth.middleware");

module.exports = commodity;
