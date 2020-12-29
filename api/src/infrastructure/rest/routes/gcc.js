const os = require("os");
const gccRouter = require("express").Router();
const multer = require("multer");
const { compile, compileStatus } = require("../../gcc/gcc");
const fs = require("fs");
const unixTimestamp = require("../../../util/timestamp");
const { extension } = require("../../../util/file");

// Liste des extensions authorisées.
const ASSET_TYPES = { c: true, cpp: true, asm: true };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    const user = req.locals.user;
    const ext = extension(file.originalname);
    const fileName = `${unixTimestamp()}_${user.email}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const ext = extension(file.originalname);
  if (!ASSET_TYPES[ext.toLowerCase()]) {
    // Je rejette le fichier
    // https://github.com/expressjs/multer#filefilter
    cb(null, false);
    // Je déclenche une erreur
    // https://github.com/expressjs/multer#error-handling
    cb(new Error("File Type unsupported."));
  } else {
    // J'accepte le fichier
    cb(null, true);
  }
};
const upload = multer({ storage, fileFilter });

// GET(récuper)
// POST(modifier)
// PUT(creer/mettre à jour totalement)
// DELETE(supprimer)

gccRouter.post(
  "/",
  (req, res, next) => {
    if (compileStatus.isCompiling()) {
      return res.status(423).send("Please wait a little wait bit. Take a ☕️");
    }
    return next();
  },
  (req, res, next) => {
    // Une méthode async permet d'utiliser le await
    // qui bloque le code pour attendre le résultat d'une
    // promesse.
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).send({ msg: err.message });
      }
      return next();
    });
  },
  async (req, res) => {
    const { path } = req.file;

    try {
      const result = await compile(path);
      return res.status(200).send(result);
    } catch (err) {
      compileStatus.stop();
      return res.status(500).send({ msg: "Unable to run your file." });
    }
  }
);

gccRouter.post(
  "/toto/:name",
  (req, res, next) => {
    if (compileStatus.isCompiling()) {
      return res.status(423).send("Please wait a little wait bit. Take a ☕️");
    }
    return next();
  },
  (req, res, next) => {
    // Une méthode async permet d'utiliser le await
    // qui bloque le code pour attendre le résultat d'une
    // promesse.
    const { name } = req.params;
    const ext = extension(name);
    const content = req.body;
    const tmp = os.tmpdir;
    const fileName = Math.random().toString(36).substring(7);
    const path = `${tmp}/${fileName}.${ext}`;
    try {
      fs.writeFileSync(path, content);
      req.locals = { ...req.locals, file: path };
    } catch (err) {
      return res.status(400).send({ msg: "Try again" });
    }
    return next();
  },
  async (req, res) => {
    const { file } = req.locals;

    try {
      const result = await compile(file);
      return res.status(200).send(result);
    } catch (err) {
      compileStatus.stop();
      return res.status(500).send({ msg: "Unable to run your file." });
    }
  }
);

module.exports = gccRouter;
