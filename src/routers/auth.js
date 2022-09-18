const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    isAdmin: req.body.isAdmin || false,
  });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  );

  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // <<<---------------------------------------------------

  if (!user || originalPassword != req.body.password) {
    return res.status(401).send({ error: "Wrong credentials" });
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );

  const { password, ...others } = user._doc;
  res.status(200).send({ ...others, accessToken });
});

module.exports = router;
