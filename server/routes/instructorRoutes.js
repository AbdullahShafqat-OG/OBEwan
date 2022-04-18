const express = require("express");
const cors = require("cors");

const instructorModel = require("../models/instructor.model");
const adminModel = require("../models/admin.model");
const app = express()

app.use(cors());
app.use(express.json());

app.get("/instructors", async (request, response) => {
    const instructors = await instructorModel.find({});

    try {
        response.send(instructors);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/instructor/login", async(request, response) => {
    const admin = await adminModel.findOne({
        email: request.body.email,
    });

    if (admin && request.body.password == admin.password) {
        const token = {
            name: admin.name,
            email: admin.email,
            privilege: "admin",
        };
        return response.json({ status: "ok", user: token });
    }

    const instructor = await instructorModel.findOne({
        email: request.body.email,
    });

    if (instructor && request.body.password == instructor.password) {
        const token = {
            name: instructor.name,
            email: instructor.email,
            privilege: "user",
        };
        return response.json({ status: "ok", user: token });
    } else {
        return response.json({ status: "error", user: false });
    }
});

app.post("/instructor", async (request, response) => {
    const instructor = new instructorModel(request.body);

    try {
        await instructor.save();
        response.send(instructor);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;