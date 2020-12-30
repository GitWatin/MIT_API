//Point d'entrée du projet

const logger = require("./util/logger");
const server = require("./infrastructure/rest/server");

(async () => {
  try {
    // On lance toutes les dépendances de notre serveur
    await server.start();
    logger.info("Server started successfully.");
  } catch (e) {
    logger.error("Internal Server Error"); // Si error kill du process
    process.kill(process.pid, "SIGINT");
  }
})();
