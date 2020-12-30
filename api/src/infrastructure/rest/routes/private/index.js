const router = require("express").Router();
const bodyParser = require("body-parser");
const { auth } = require("../../middlewares");
const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const compileRouter = require("./compile");

// On définit les middlewares pour les routes privées
router.use(auth);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.text({ limit: "2mb" }));

router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/compile", compileRouter);

module.exports = router;
