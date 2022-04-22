const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
  },
  clos: {
    type: [String],
  },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
