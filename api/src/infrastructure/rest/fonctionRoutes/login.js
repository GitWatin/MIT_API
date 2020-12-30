const database = require("../../database/mysql");

const getUserByEmail = async (email, password) => {
  const result = await database.query(
    "SELECT * FROM people WHERE email=? AND password=?",
    [email, password]
  );

  if (!result.length) {
    return undefined;
  }

  return result[0];
};

module.exports = {
  getUserByEmail,
};
