const pino = require("pino");
const { loggerConfig } = require("../config/config");

const logger = pino(loggerConfig);

module.exports = logger;
