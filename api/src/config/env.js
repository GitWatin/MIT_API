// On lit le fichier .env grâce à dotenv
require("dotenv").config();

const {
  NODE_ENV,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DBNAME,
  LOG_LEVEL,
  PORT,
  TOKEN_SECRET,
} = process.env;

const env = {
  NODE_ENV,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DBNAME,
  LOG_LEVEL,
  PORT,
  TOKEN_SECRET,
};

Object.freeze(env);

module.exports = env; // Export de l'object env contennant les données contenue dans .env
