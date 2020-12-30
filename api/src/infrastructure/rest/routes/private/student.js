const studentRouter = require("express").Router();
const peopleFonctions = require("../../fonctionRoutes/people");
const {
  isTeacher,
  hasEmail,
  hasFirstname,
  hasLastname,
  hasPassword,
} = require("../../middlewares");
const { toPeopleReturn } = require("../../dataReturn/people");
const hashPassword = require("../../../../util/hashPassword");

// GET(récuper)
// POST(modifier)
// PUT(creer/mettre à jour totalement)
// DELETE(supprimer)

studentRouter.get("/", async (req, res) => {
  const { email } = req.query;

  if (email) {
    const result = await peopleFonctions.getByEmail(email);
    if (!result) {
      return res.status(404).send({ msg: "Student not found" });
    }
    return res.status(200).send(toPeopleReturn(result));
  }

  const result = await peopleFonctions.listAllStudents();
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map
  return res.status(200).send(result.map(toPeopleReturn));
});

studentRouter.post(
  "/",
  isTeacher,
  hasFirstname,
  hasLastname,
  hasEmail,
  hasPassword,
  async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const hash = hashPassword(password);

    const result = await peopleFonctions.create({
      firstname,
      lastname,
      email,
      password: hash,
      status: 1,
    });

    if (!result) {
      return res
        .status(400)
        .send({ msg: "Unable to insert the requested student." });
    }

    return res.status(201).send({ msg: "User created." });
  }
);

studentRouter.put("/", async (req, res) => {
  const {
    user: { email: emailToUpdate },
  } = req.locals;
  return await updateUser(emailToUpdate, { ...req.body }, res);
});

studentRouter.put("/:email", isTeacher, async (req, res) => {
  const { email: emailToUpdate } = req.params;
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
    console.log(password);
    console.log(hash);
    try {
      await peopleFonctions.updatePassword(emailToUpdate, hash);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ msg: "Unable to update the password of the student." });
    }
  }
  return res.status(200).send({ msg: "User updated." });
};

studentRouter.delete("/:email", isTeacher, async (req, res) => {
  const { email } = req.params;
  const result = await peopleFonctions.deleteStudent(email);

  if (!result) {
    return res
      .status(400)
      .send({ msg: "Unable to delete the requested student." });
  }

  return res.status(204).send();
});

module.exports = studentRouter;
