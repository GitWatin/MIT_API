const express = require("express");
const router = express.Router();
const student = require("../../ws/student");

// GET(récuper)
// POST(modifier)
// PUT(creer/mettre à jour totalement)
// PATCH(mettre à jour une partie d'un object)
// DELETE(supprimer)

router.get("/student/listuser/", student.getStudent);
router.post("/student/:student_id", student.setDetails);
router.get("/student/:student_id/results", student.getResults);
router.get("/student/:student_id/details", student.getDetails);
router.post("/student/:student_id/results", student.setResults);
router.post("/student", student.create);

module.exports = router;
