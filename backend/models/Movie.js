const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  watched: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
