const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("../../util/logger");
const peopleFonctions = require("./fonctionRoutes/people");
const { restConfig } = require("../../config/config");

// Logguer toutes les requêtes HTTP de l'API
// const pinoHttp = require('pino-http');
// const pinoHttpInstance = pinoHttp({ logger });
const pinoHttp = require("pino-http")({ logger });

const auth = async (req, res, next) => {
  const bearer = req.header("Authorization");

  if (!bearer) {
    return res.status(401).send();
  }

  const token = bearer.replace(/^Bearer /i, "");

  try {
    const user = jwt.verify(token, restConfig.secret);
    req.locals = { ...req.locals, user };
  } catch (err) {
    return res.status(401).send();
  }

  return next();
};

const isTeacher = async (req, res, next) => {
  const { email } = req.locals.user;
  const teacher = await peopleFonctions.getTeacherByEmail(email);

  if (!teacher) {
    return res
      .status(401)
      .send({ msg: "You're not allowed to see the teacher content" });
  }

  return next();
};

const error = (err, _req, res, _next) => {
  if (res.headersSent) {
    return next(err);
  }
  logger.error(err);
  return res.status(500).send({ msg: "Internal Server Error" });
};

const hasFirstname = (req, res, next) => {
  const { firstname } = req.body;

  if (!firstname) {
    return res.status(400).send({ msg: "You have to specify the firstname." });
  }

  return next();
};

const hasLastname = (req, res, next) => {
  const { lastname } = req.body;

  if (!lastname) {
    return res.status(400).send({ msg: "You have to specify the lastname." });
  }

  return next();
};

const hasEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ msg: "You have to specify the email." });
  }

  return next();
};

const middlewares = [
  helmet(),
  bodyParser.json({ limit: "10kb" }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.text({ limit: "2mb" }),
  pinoHttp,
  auth,
];

module.exports = {
  middlewares,
  isTeacher,
  error,
  hasFirstname,
  hasLastname,
  hasEmail,
};
