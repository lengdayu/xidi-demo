const connection = require("../app/database");

class UserService {
  async createUser(userInfo) {
    const statement = `INSERT INTO user SET ?;`;
    const result = await connection.query(statement, userInfo);
    return result[0];
  }

  async getUserById(userId) {
    const statement = `SELECT * FROM user WHERE userId = ?;`;
    const result = await connection.execute(statement, [userId]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
