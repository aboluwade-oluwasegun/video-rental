const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  //validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //authenticate email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password");

  //authenticate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  //generate and send token
  const token = user.generateAuthToken();
  res.send(token);
});

//validate username and password
function validate(req) {
  schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return (result = Joi.validate(req, schema));
}

module.exports = router;
