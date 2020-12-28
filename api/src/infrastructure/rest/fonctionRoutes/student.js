const database = require("../infrastructure/database/mysql");

module.exports = {
  getResults: function (_req, _res) {},

  getDetails: async function (req, res) {
    const { student_id: studentId } = req.params;

    const result = await database.query("SELECT * FROM people WHERE id=?", [
      studentId,
    ]);

    if (result == 0) {
      return res.send("Etudiant inexistant");
    }

    if (!result.length || result.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = result[0];
    return res.status(200).send(user);
  },
  setResults: function (req, res) {},

  getStudent: function (req, res) {
    database.query("SELECT * FROM people", function (err, results, fields) {
      //results = results.map(v => Object.assign({}, v));
      console.log(results);
      res.send(JSON.stringify(results));
    });
  },
  setDetails: function (req, res) {},
  create: function (req, res) {
    console.log(req.body);
    const item = req.body;

    //console.log(item['nom']);
    const obj = JSON.parse(item);
    console.log(obj.nom);
    res.send("coucou");
  },
};
