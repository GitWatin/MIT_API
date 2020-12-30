const teacherRouter = require("express").Router();
const peopleFonctions = require("../../fonctionRoutes/people");
const { toPeopleReturn } = require("../../dataReturn/people");
const { isTeacher } = require("../../middlewares");

// GET(récuper)
// POST(modifier)
// PUT(creer/mettre à jour totalement)
// DELETE(supprimer)

teacherRouter.use(isTeacher);

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
  return await updateUser(emailToUpdate, { ...req.body }, res);
});

const updateUser = async (
  emailToUpdate,
  { firstname, lastname, email, password },
  res
) => {
  if (firstname) {
    try {
      await peopleFonctions.updateFirstname(emailToUpdate, firstname);
    } catch (err) {
      return res
        .status(400)
        .send({ msg: "Unable to update the firstname of the student." });
    }
  }
  if (lastname) {
    try {
      await peopleFonctions.updateLastname(emailToUpdate, lastname);
    } catch (err) {
      return res
        .status(400)
        .send({ msg: "Unable to update the lastname of the student." });
    }
  }
  if (email) {
    try {
      await peopleFonctions.updateEmail(emailToUpdate, email);
    } catch (err) {
      return res
        .status(400)
        .send({ msg: "Unable to update the email of the student." });
    }
  }
  if (password) {
    const hash = hashPassword(password);
    try {
      await peopleFonctions.updatePassword(emailToUpdate, hash);
    } catch (err) {
      return res
        .status(400)
        .send({ msg: "Unable to update the password of the student." });
    }
  }
  return res.status(200).send({ msg: "User updated." });
};

module.exports = teacherRouter;
