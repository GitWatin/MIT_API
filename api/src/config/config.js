
/// configuration de la connection de la DB

const env = require("./env");

const mysqlConfig = {
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  dbName: env.MYSQL_DBNAME,
};

const loggerConfig = {
  level: env.LOG_LEVEL || "info",
  prettyPrint: env.NODE_ENV === "development",
};

const restConfig = {
  port: env.PORT || 8080,
  secret: env.TOKEN_SECRET,
};

Object.freeze(restConfig); // emepche la modification par la suite
Object.freeze(mysqlConfig);
Object.freeze(loggerConfig);

module.exports = { restConfig, loggerConfig, mysqlConfig };
