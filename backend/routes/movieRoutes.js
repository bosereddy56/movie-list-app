const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST new movie
router.post('/', async (req, res) => {
  try {
    const { title, rating, watched } = req.body;
    if (!title || rating === undefined) return res.status(400).json({ message: 'title and rating required' });
    const movie = new Movie({ title, rating, watched: !!watched });
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Could not create movie', error: err.message });
  }
});

// PUT toggle watched
router.put('/:id', async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// DELETE movie
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
