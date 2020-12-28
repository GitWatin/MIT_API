const express = require("express");
const middlewares = require("./middlewares");
const logger = require("../../util/logger");
const { restConfig } = require("../../config/config");
const routes = require("./routes");

const app = express();

// On ajoute chaque middleware à express
// Équivalent à :
// app.use(middleware1)
// app.use(middleware2)
app.use(...middlewares);

app.use(routes);

const server = {
  start: () =>
    new Promise((resolve, reject) => {
      app.listen(restConfig.port, (error) => {
        if (error) {
          reject(error);
        }
        logger.info("Rest layer successfully started");
        resolve();
      });
    }),
};

Object.freeze(server);

module.exports = server;
