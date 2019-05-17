const express = require("express");
const { Customer, validate } = require("../models/customer");

const router = express.Router();

// get all customers
router.get("/", async (req, res) => {
  customers = await Customer.find().sort("name");
  res.send(customers);
});

//add a customer
router.post("/", async (req, res) => {
  // validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // add the genre
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  try {
    await customer.save();
    res.send(customer);
  } catch (ex) {
    for (field in ex.errors) res.send(ex.errors[field].message);
  }
});

module.exports = router;
