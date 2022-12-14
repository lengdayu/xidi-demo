const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
const { getUserById } = require("../service/user.service");

class authController {
  async login(ctx, next) {
    const { userId, userName } = ctx.user;
    const token = jwt.sign({ userId, userName }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });

    ctx.body = { userId, userName, token };
  }
}
module.exports = new authController();
