const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    phone: {
      type: Number,
      required: true,
      minlength: 5,
      maxlength: 50
      // validate: {
      //   validator: function(v) {
      //     return v && v.length > 11;
      //   },
      //   message: "Phone number should be greater than 11"
      // }
    }
  })
);

// validate requests
function validateRequest(customer) {
  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),

    phone: Joi.number()
      .min(5)
      .max(50)
      .required(),

    isGold: Joi.boolean().required()
  };

  return (result = Joi.validate(customer, schema));
}

exports.Customer = Customer;
exports.validate = validateRequest;
