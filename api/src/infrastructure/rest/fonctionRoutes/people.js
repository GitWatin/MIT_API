const database = require("../../database/mysql");

const getTeacherByEmail = async (email) => {
  const result = await database.query(
    "SELECT * FROM people WHERE email=? AND status = 0",
    [email]
  );

  if (!result.length) {
    return undefined;
  }

  return result[0];
};

const getByEmail = async (email) => {
  const result = await database.query("SELECT * FROM people WHERE email=?", [
    email,
  ]);

  if (!result.length) {
    return undefined;
  }

  return result[0];
};

const create = async ({ firstname, lastname, email, status }) => {
  const people = { nom: lastname, prenom: firstname, email, status };
  const result = await database.query("INSERT INTO people SET ?", people);

  if (!result.length) {
    return false;
  }

  return true;
};

const update = async (emailToUpdate, { firstname, lastname, email }) => {
  const result = await database.query(
    "UPDATE people SET prenom = ?, nom = ?, email = ? WHERE email = ?",
    [firstname, lastname, email, emailToUpdate]
  );

  if (!result.affectedRows) {
    return false;
  }

  return true;
};

const listAllStudents = async () => {
  const result = await database.query("SELECT * FROM people WHERE status = 1");
  return result;
};

module.exports = {
  getTeacherByEmail,
  getByEmail,
  create,
  update,
  listAllStudents,
};
