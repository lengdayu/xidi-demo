const app = require("./app");
require("./app/database");

const config = require("./app/config");

app.listen(config.APP_PORT, () => {
  console.log(`服务器启动在${config.APP_PORT}端口~`);
});
