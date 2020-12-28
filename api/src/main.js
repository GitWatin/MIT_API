const logger = require("./util/logger");
const server = require("./infrastructure/rest/server");

(async () => {
  try {
    // On lance toutes les dépendances de notre serveur
    await server.start();
  } catch (e) {
    logger.error("Internal Server Error");
    process.kill(process.pid, "SIGINT");
  }
})();
