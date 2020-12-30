const mysql = require("mysql");
const logger = require("../../util/logger");
const { mysqlConfig } = require("../../config/config");

//Fichier pour creer la connexion à la DB

const connection = mysql.createConnection({
  host: mysqlConfig.host,
  user: mysqlConfig.username,
  password: mysqlConfig.password,
  database: mysqlConfig.dbName,
});


// Fonction pour envoyer la Query en utilisant les promesses
const query = (query, parameters = []) =>
  new Promise((resolve) => {
    connection.query(query, parameters, function (err, results) {
      if (err) {
        logger.warn(err);
        return resolve([]);
      }
      return resolve(results);
    });
  });

module.exports = { query };
