const mongoose = require('mongoose');

const CloSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  statement: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const Clo = mongoose.model('Clo', CloSchema);

module.exports = Clo;
