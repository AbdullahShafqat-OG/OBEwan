const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const Instructor = mongoose.model("Instructor", InstructorSchema);

module.exports = Instructor;