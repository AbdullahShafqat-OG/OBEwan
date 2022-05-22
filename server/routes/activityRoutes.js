const express = require('express');
const activityModel = require('../models/activity.model');
const app = express();

app.post('/api/create-activity', async (request, response) => {
  const activity = new activityModel(request.body);

  try {
    await activity.save();
    response.send(activity);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

app.get('/api/activity-list', async (request, response) => {
  const activities = await activityModel.find({});

  try {
    response.send(activities);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/api/get-activity/:id', async (request, response) => {
  const activity = await activityModel.findById(request.params.id);

  try {
    response.send(activity);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/api/course-activity-list/:code', async (request, response) => {
  const activities = await activityModel.find({ course: request.params.code });

  try {
    response.send(activities);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete('/api/delete-activity/:id', async (request, response) => {
  try {
    const activity = await activityModel.findByIdAndDelete(request.params.id);

    if (!activity) response.status(404).send('No item found');
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
