const studentRouter = require("express").Router();
const peopleFonctions = require("../fonctionRoutes/people");
const {
  isTeacher,
  hasEmail,
  hasFirstname,
  hasLastname,
} = require("../middlewares");
const { toPeopleReturn } = require("../dataReturn/people");

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
  async (req, res) => {
    const { firstname, lastname, email } = req.body;

    const result = await peopleFonctions.create({
      firstname,
      lastname,
      email,
      status: 1,
    });

    if (!result) {
      return res
        .status(400)
        .send({ msg: "Unable to insert the requested student." });
    }

    return res.status(201).send();
  }
);

studentRouter.put(
  "/",
  hasFirstname,
  hasLastname,
  hasEmail,
  async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const { email: emailToUpdate } = req.locals.user;
    const result = await peopleFonctions.update(emailToUpdate, {
      firstname,
      lastname,
      email,
    });

    if (!result) {
      return res
        .status(400)
        .send({ msg: "Unable to update the requested student." });
    }

    return res.status(204).send();
  }
);

studentRouter.put(
  "/:email",
  isTeacher,
  hasFirstname,
  hasLastname,
  hasEmail,
  async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const { email: emailToUpdate } = req.params;
    const result = await peopleFonctions.update(emailToUpdate, {
      firstname,
      lastname,
      email,
    });

    if (!result) {
      return res
        .status(400)
        .send({ msg: "Unable to update the requested student." });
    }

    return res.status(204).send();
  }
);

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
