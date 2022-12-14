const connection = require("../app/database");

class UserService {
  async create(user) {
    const { userId, passWord } = user;
    const statement = `INSERT INTO user (userId, passWord) VALUES (?, ?);`;
    const result = await connection.execute(statement, [userId, passWord]);

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
