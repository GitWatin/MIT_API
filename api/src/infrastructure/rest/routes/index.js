const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../fonctionRoutes/login");
const { hasEmail, hasPassword } = require("../middlewares");
const privateRouter = require("./private");
const { restConfig } = require("../../../config/config");
const { toPeopleReturn } = require("../dataReturn/people");

router.post("/login", hasEmail, hasPassword, async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email, password);

  if (!user) {
    return res.status(401).send({ msg: "Credentials invalid." });
  }

  const { firstname, lastname, email: userMail } = toPeopleReturn(user);

  const ONE_MINUTE = 60;
  const ONE_HOUR_FROM_NOW = Math.floor(Date.now() / 1000) + 60 * ONE_MINUTE;

  const body = {
    email: userMail,
    name: `${firstname} ${lastname}`,
    exp: ONE_HOUR_FROM_NOW,
  };
  const token = jwt.sign(body, restConfig.secret);

  return res.status(200).send({ token });
});
router.use("/", privateRouter);

module.exports = router;
