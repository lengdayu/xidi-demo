const { getUserById } = require("../service/user.service");

class userController {
  async create(ctx, next) {
    const { userId } = ctx.user;
  }
  async userDetail(ctx, next) {
    const { userId } = ctx.user;
    const result = (await getUserById(userId))[0];
    console.log(result);
    delete result?.passWord;
    ctx.body = result;
  }
}
module.exports = new userController();
