const express = require("express");
const ploModel = require("../models/plo.model");
const app = express()

app.get("/api/plo-list", async (request, response) => {
    const plos = await ploModel.find({});

    try {
        response.send(plos);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/api/get-plo/:id", async (request, response) => {
    const plo = await ploModel.findById(request.params.id);

    try {
        response.send(plo);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/api/create-plo", async (request, response) => {
    const plo = new ploModel(request.body);

    try {
        await plo.save();
        response.status(200).send(plo);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.patch("/api/update-plo/:id", async (request, response) => {
    try {
        const plo = await ploModel.findByIdAndUpdate(request.params.id, request.body);
        // await foodModel.save();
        response.send(plo);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/api/delete-plo/:id", async (request, response) => {
    try {
        const plo = await ploModel.findByIdAndDelete(request.params.id);

        if (!plo) response.status(404).send("No item found");
        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;