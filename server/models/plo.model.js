const mongoose = require("mongoose");

const PloSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },
    label: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    statement: {
        type: String, 
        required: true,
    },
    degree: {
        type: String,
        required: true,
    }
});

const Plo = mongoose.model("Plo", PloSchema);

module.exports = Plo;