const router = require("express").Router();
const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const compileRouter = require("./compile");

router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/compile", compileRouter);

module.exports = router;
