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

const create = async ({ firstname, lastname, email, password, status }) => {
  const people = { nom: lastname, prenom: firstname, email, password, status };
  const result = await database.query("INSERT INTO people SET ?", people);

  // When an error occurs the result is an empty array
  if (Array.isArray(result) && result.length === 0) {
    return false;
  }

  return true;
};

const updateField = async (emailToUpdate, field, content) => {
  await database.query(`UPDATE people SET ${field}=? WHERE email=?`, [
    content,
    emailToUpdate,
  ]);
};

const updateFirstname = (emailToUpdate, firstname) =>
  updateField(emailToUpdate, "prenom", firstname);
const updateLastname = (emailToUpdate, lastname) =>
  updateField(emailToUpdate, "nom", lastname);
const updatePassword = (emailToUpdate, password) =>
  updateField(emailToUpdate, "password", password);
const updateEmail = (emailToUpdate, email) =>
  updateField(emailToUpdate, "email", email);

const deleteStudent = async (email) => {
  const result = await database.query(
    "DELETE FROM people WHERE email = ? AND status = 1",
    [email]
  );

  if (Array.isArray(result) && result.length === 0) {
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
  deleteStudent,
  listAllStudents,
  updateFirstname,
  updateLastname,
  updatePassword,
  updateEmail,
};
