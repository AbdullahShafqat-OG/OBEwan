const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  clo: {
    type: String,
  },
  weightage: {
    type: Number,
    required: true,
  },
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
