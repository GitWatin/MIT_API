const database = require("../../database/mysql");

const addCompilationToHistory = async (email, result, path) => {
  const historyElement = { email, date: new Date(), result, file: path };
  const r = await database.query(
    "INSERT INTO compiler_history SET ?",
    historyElement
  );

  // When an error occurs the result is an empty array
  if (Array.isArray(r) && r.length === 0) {
    throw new Error("Unable to insert the result in the history.");
  }

  return true;
};

const getLastCompilations = async () => {
  const result = await database.query(
    "SELECT * FROM compiler_history ORDER BY id DESC LIMIT 10"
  );

  // When an error occurs the result is an empty array
  if (!result.length) {
    return undefined;
  }

  return result;
};

module.exports = { addCompilationToHistory, getLastCompilations };
