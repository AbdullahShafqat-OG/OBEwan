const express = require("express");
const cloModel = require("../models/clo.model");
const app = express()

app.get("/clos", async (request, response) => {
    const clos = await cloModel.find({});

    try {
        response.send(clos);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/clo", async (request, response) => {
    const clo = new cloModel(request.body);

    try {
        await clo.save();
        response.send(clo);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;