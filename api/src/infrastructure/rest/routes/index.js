const express = require("express");
const router = express.Router();
const studentRouter = require("./student");
const teacherRouter = require("./teacher");

router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

module.exports = router;
