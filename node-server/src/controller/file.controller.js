const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    console.log("开始处理用户头像信息");
    // 1.获取图像相关的信息
    const { filename, mimetype, size } = ctx.req.file;
    const { userId } = ctx.user;

    // 2.将图像信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, userId);
    // 3.将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`;
    await userService.updateAvatarUrlById(avatarUrl, userId);

    // 4.返回结果
    ctx.body = "上传头像成功~";
  }
}

module.exports = new FileController();
