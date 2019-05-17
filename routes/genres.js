const express = require("express");
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

//get all genres of movies
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// get a particular genre
router.get("/:id", async (req, res) => {
  // find the specific genre
  const genre = await Genre.findOne(req.params.id);

  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID is not available");

  res.send(genre);
});

// add a genre
router.post("/", auth, async (req, res) => {
  // validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // add the genre
  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);
});

// edit a genre
router.put("/:id", async (req, res) => {
  // validate the request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // update the genre
  const genre = await Genre.findOneAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID cannot be found");

  res.send(genre);
});

// delete a genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findOneAndDelete(req.params.id);

  if (!genre)
    return res
      .status(404)
      .send("The genre with the specified ID is not available");

  res.send(genre);
});

module.exports = router;
