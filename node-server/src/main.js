const Koa = require("koa");
require("./app/database");

const config = require("./app/config");

//创建服务
const app = new Koa();

app.listen(config.APP_PORT, () => {
  console.log(`服务器启动在${config.APP_PORT}端口~`);
});
