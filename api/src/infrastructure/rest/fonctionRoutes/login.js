const database = require("../../database/mysql");

const getUserByEmail = async (email, password) => {
  const result = await database.query(
    "SELECT * FROM people WHERE email=? AND password=?", // Viens chercher l'user dans la SB
    [email, password]
  );

  if (!result.length) {
    return undefined;  // Si rien de retour alors undefined
  }

  return result[0];
};

module.exports = {
  getUserByEmail,
};
