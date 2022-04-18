const express = require("express");
const courseModel = require("../models/course.model");
const app = express()

app.get("/courses", async (request, response) => {
    const courses = await courseModel.find({});

    try {
        response.send(courses);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/course", async (request, response) => {
    const course = new courseModel(request.body);

    try {
        await course.save();
        response.send(course);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;