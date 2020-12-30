const teacherRouter = require("express").Router();
const peopleFonctions = require("../../fonctionRoutes/people");
const { toPeopleReturn } = require("../../dataReturn/people");
const { isTeacher } = require("../../middlewares");

// GET(récuper)
// POST(modifier)
// PUT(creer/mettre à jour totalement)
// DELETE(supprimer)

teacherRouter.use(isTeacher); // Dans ces routes obligatoires d'etre d'office teacher pour ne pas le préciser à chaque fois.

teacherRouter.get("/", async (req, res) => {
  const { email } = req.query;

  const result = await peopleFonctions.getByEmail(email);
  if (!result) {
    return res.status(404).send({ msg: "Teacher not found" });
  }
  return res.status(200).send(toPeopleReturn(result));
});

teacherRouter.post("/", async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const result = await peopleFonctions.createTeacher({
    firstname,
    lastname,
    email,
    status: 0,
  });

  if (!result) {
    return res
      .status(400)
      .send({ msg: "Unable to insert the requested teacher." });
  }

  return res.status(201).send();
});

teacherRouter.put("/", async (req, res) => {
  const {
    user: { email: emailToUpdate },
  } = req.locals;
  return await peopleFonctions.updateUser(emailToUpdate, { ...req.body }, res);
});

module.exports = teacherRouter;
