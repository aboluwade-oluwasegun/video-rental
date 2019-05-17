const express = require("express");
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");

const router = express.Router();

// get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

// add a movie
router.post("/", async (req, res) => {
  // validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find the genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  //add the movie
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  //save the movie
  // movie = await movie.save();
  try {
    await movie.save();
  } catch (ex) {
    res.status(500).send("Something is wrong");
  }

  res.send(movie);
});

// update a movie
router.put("/:id", async (req, res) => {
  // validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  //find movie
  const movie = await Movie.findOneAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  if (!movie) res.status(404).send("The movie with the specified ID not found");
  res.send(movie);
});

//delete a movie
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findOneAndDelete(req.params.id);

  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie);
});

//find just one movie
router.get("/:id", async (req, res) => {
  const movie = await Movie.findOne(req.params.id);

  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie);
});

module.exports = router;
