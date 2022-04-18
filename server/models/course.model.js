const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
    },
    instructors: {
        type: [String]
    },
    mapping: {
        type: Map,
    },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;