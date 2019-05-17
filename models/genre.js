const Joi = require("joi");
const mongoose = require("mongoose");

// create schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// create model
const Genre = mongoose.model("Genre", genreSchema);

// validate requests
function validateRequest(genre) {
  schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };

  return (result = Joi.validate(genre, schema));
}

exports.Genre = Genre;
exports.validate = validateRequest;
exports.genreSchema = genreSchema;
