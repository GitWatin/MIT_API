const express = require("express");
const router = express.Router();
const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const gccRouter = require("./gcc");

router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);
router.use("/gcc", gccRouter);

module.exports = router;
