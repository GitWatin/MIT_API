
// Logger pino
const pino = require("pino");
const { loggerConfig } = require("../config/config"); // get config dans pino

const logger = pino(loggerConfig);

module.exports = logger;
