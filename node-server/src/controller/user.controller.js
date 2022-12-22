const fs = require("fs");
const { getUserById, createUser } = require("../service/user.service");
const fileService = require("../service/file.service");
const { AVATAR_PATH } = require("../constants/file-path");

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

  //查询头像信息
  async avatarInfo(ctx, next) {
    // 1.用户的头像是哪一个文件呢?
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);

    // 2.提供图像信息
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}
module.exports = new userController();
