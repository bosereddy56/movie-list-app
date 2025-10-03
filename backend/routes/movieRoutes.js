const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// POST a new movie
router.post("/", async (req, res) => {
  const { title, rating } = req.body;
  const movie = new Movie({ title, rating });
  await movie.save();
  res.json(movie);
});

// Toggle watched
router.put("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  movie.watched = !movie.watched;
  await movie.save();
  res.json(movie);
});

// Delete movie
router.delete("/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
