const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;