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
};

Object.freeze(env);

module.exports = env;
