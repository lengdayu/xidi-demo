const { getUserById, createUser } = require("../service/user.service");

class userController {
  //用户创建
  async create(ctx, next) {
    const userInfo = ctx.request.body;
    console.log("kaishi1");
    const result = await createUser(userInfo);
    if (result.affectedRows > 0) {
      ctx.body = {
        resCode: "00000",
        message: "用户创建成功！",
      };
    } else {
      ctx.body = {
        resCode: "00001",
        message: "用户创建失败！",
      };
    }
  }
  //用户信息查询
  async userDetail(ctx, next) {
    const { userId } = ctx.request.body;
    console.log(userId);
    const result = (await getUserById(userId))[0];
    console.log(result);
    delete result?.passWord;
    if (Object.keys(result)) {
      ctx.body = {
        resCode: "00000",
        data: {
          ...result,
        },
      };
    } else {
      ctx.body = {
        resCode: "00001",
        message: "查询失败",
      };
    }
  }
}
module.exports = new userController();
