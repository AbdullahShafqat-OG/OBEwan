const express = require("express");
const ploModel = require("../models/plo.model");
const app = express()

app.get("/api/plos", async (request, response) => {
    const plos = await ploModel.find({});

    try {
        response.send(plos);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/api/create/plo", async (request, response) => {
    const plo = new ploModel(request.body);

    try {
        await plo.save();
        response.status(200).send(plo);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;