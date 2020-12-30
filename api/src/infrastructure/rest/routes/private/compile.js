const fs = require("fs");
const os = require("os");
const compileRouter = require("express").Router();
const { compile, compileStatus } = require("../../../compilation/compile");
const { getLastCompilations } = require("../../fonctionRoutes/compile");
const unixTimestamp = require("../../../../util/timestamp");
const { extension } = require("../../../../util/file");
const { isTeacher } = require("../../middlewares");

// Liste des extensions authorisées.
const ASSET_TYPES = { c: true, cpp: true, asm: true };

const extractFileName = (req, res, next) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).send({ msg: "You have to enter a name." });
  }

  return next();
};

const extractExtension = (req, res, next) => {
  const { name } = req.params;

  const ext = extension(name);

  if (!ext) {
    return res.status(400).send({
      msg: "The name of the file doesn't contains any extension.",
    });
  }

  const file = req.locals.file || {};
  req.locals = {
    ...req.locals,
    file: { ...file, extension: ext },
  };

  return next();
};

const isExtensionSupported = (req, res, next) => {
  const { extension: ext } = req.locals.file;

  if (!ASSET_TYPES[ext.toLowerCase()]) {
    return res
      .status(400)
      .send({ msg: "The file extension is not supported." });
  }

  return next();
};

compileRouter.post(
  "/:name",
  extractFileName,
  extractExtension,
  isExtensionSupported,
  (_req, res, next) => {
    if (compileStatus.isCompiling()) {
      return res
        .status(423)
        .send({ msg: "Please wait a little wait bit. Take a ☕️" });
    }

    return next();
  },
  (req, res, next) => {
    // Une méthode async permet d'utiliser le await
    // qui bloque le code pour attendre le résultat d'une
    // promesse.
    const {
      user,
      file: { extension: ext },
    } = req.locals;

    const content = req.body;
    const tmp = os.tmpdir;
    const fileName = `${unixTimestamp()}_${user.email}`;
    const path = `${tmp}/${fileName}.${ext}`;
    const file = req.locals.file;
    try {
      fs.writeFileSync(path, content);
      req.locals = {
        ...req.locals,
        file: { ...file, path },
      };
    } catch (err) {
      return res
        .status(400)
        .send({ msg: `Unable to write the file because of ${err.message}` });
    }
    return next();
  },
  async (req, res) => {
    const {
      file: { path },
      user: { email },
    } = req.locals;

    try {
      const result = await compile(path, email);
      return res.status(200).send(result);
    } catch (err) {
      compileStatus.stop();
      return res
        .status(500)
        .send({ msg: `Unable to run your file because of: ${err.message}` });
    }
  }
);

compileRouter.get("/", isTeacher, async (req, res) => {
  let result = [];
  try {
    result = await getLastCompilations();
  } catch (err) {
    logger.warn(err);
  } finally {
    return res.status(200).send(result);
  }
});

module.exports = compileRouter;
