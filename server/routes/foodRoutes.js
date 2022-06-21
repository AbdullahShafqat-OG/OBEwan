const express = require('express');
const foodModel = require('../models/food.model');
const app = express();

app.get('/foods-list', async (request, response) => {
  const foods = await foodModel.find({});

  try {
    response.send(foods);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/food', async (request, response) => {
  const food = new foodModel(request.body);

  try {
    await food.save();
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch('/food/:id', async (request, response) => {
  try {
    const food = await foodModel.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    // await foodModel.save();
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/food/:id', async (request, response) => {
  try {
    const food = await foodModel.findByIdAndDelete(request.params.id);

    if (!food) response.status(404).send('No item found');
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
