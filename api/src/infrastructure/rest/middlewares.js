const logger = require("../../util/logger");
// Logguer toutes les requêtes HTTP de l'API
// const pinoHttp = require('pino-http');
// const pinoHttpInstance = pinoHttp({ logger });
const pinoHttp = require("pino-http")({ logger });

const middlewares = [pinoHttp];

module.exports = middlewares;
