const express = require("express");
const cloModel = require("../models/clo.model");
const app = express()

app.get("/api/clo-list", async (request, response) => {
    const clos = await cloModel.find({});

    try {
        response.send(clos);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/api/create-clo", async (request, response) => {
    const clo = new cloModel(request.body);

    try {
        await clo.save();
        response.send(clo);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/api/delete-clo/:id", async (request, response) => {
    try {
        const clo = await cloModel.findByIdAndDelete(request.params.id);

        if (!clo) response.status(404).send("No item found");
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
});

// using course code for convenience
// returns list
// [
//     {
//         "_id": "62625a285bce396c65fcfaa8",
//         "name": "CLO1",
//         "statement": "Understand the principles of Software Construction.",
//         "course": "SE-312",
//         "__v": 0
//     }
// ]
app.get("/api/clo-list-course/:coursecode", async (request, response) => {
    const clos = await cloModel.find({ course: request.params.coursecode });

    try {
        response.send(clos);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;