const express = require("express");
const { middlewares, error } = require("./middlewares");
const logger = require("../../util/logger");
const { restConfig } = require("../../config/config");
const routes = require("./routes");

const app = express();

// On ajoute chaque middleware à express
// Équivalent à :
// app.use(middleware1)
// app.use(middleware2)
app.use(...middlewares); // Utiliser tous les middelwares contenu dans un tableau

app.use("/", routes);

// Doit rester à la fin
app.use(error); //middelware error (server error 500)

const server = {
  start: () =>
    new Promise((resolve, reject) => {
      app.listen(restConfig.port, (error) => {
        if (error) {
          reject(error);
        }
        logger.info("Rest layer successfully started"); //log dans pino
        resolve();
      });
    }),
};

Object.freeze(server);

module.exports = server;
