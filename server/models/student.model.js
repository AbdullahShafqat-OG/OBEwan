const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  regNo: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  marksArr: {
    type: [
      {
        marks: Number,
        activityId: String,
      },
    ],
    required: true,
  },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
