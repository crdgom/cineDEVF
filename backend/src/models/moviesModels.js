const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  auditorium: {
    type: String,
    required: true
  },
  complex_name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  schedules: {
    type: [scheduleSchema],
    default: []
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
