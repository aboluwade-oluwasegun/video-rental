const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

//get all user
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

//get a particular user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//add a user
router.post("/", async (req, res) => {
  //validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //make sure the user is not already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  //register user
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  //hash the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //generate token
  const token = user.generateAuthToken();
  try {
    await user.save();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["id", "name", "email"]));
  } catch (ex) {
    for (field in ex.errors) res.send(ex.errors[field].message);
  }
});

module.exports = router;
