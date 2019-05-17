const Joi = require("joi");
const mongoose = require("mongoose");

const { genreSchema } = require("./genre");

// create movie model
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
      trim: true
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      min: 5,
      max: 500
    },
    dailyRentalRate: {
      type: Number,
      minlength: 5,
      maxlength: 500
    }
  })
);

// validate requests
function validateMovie(movie) {
  schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),

    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  };

  return (result = Joi.validate(movie, schema));
}

exports.Movie = Movie;
exports.validate = validateMovie;
