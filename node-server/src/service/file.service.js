const connection = require("../app/database");

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, userId) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE userId = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result.pop();
  }

  async createFile(filename, mimetype, size, userId) {
    const statement = `INSERT INTO file (filename, mimetype, size, userId) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();
