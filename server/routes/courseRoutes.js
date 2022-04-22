const express = require("express");
const courseModel = require("../models/course.model");
const app = express();

app.get("/api/course-list", async (request, response) => {
  const courses = await courseModel.find({});

  try {
    response.send(courses);
  } catch (error) {
    response.status(500).send(error);
  }
});

// returns an array of strings
// [
//     "seema@mail.com",
//     "majid@mail.com"
// ]
app.get("/api/course/instructor-list/:id", async (request, response) => {
  const course = await courseModel.findById(request.params.id);

  try {
    response.send(course.instructors);
  } catch (error) {
    response.status(500).send(error);
  }
});

// returns an array of dictionaries
// [
//     {
//         "clo": "CLO-1",
//         "plo": [
//             "PLO-1",
//             "PLO-2"
//         ],
//         "_id": "625ffbf84a0c8122a4407d33"
//     }
// ]
//
// getting clo that is being mapped to ==> course.mapping[index]['clo']
// getting plos being mapped against clo ==> course.mapping[index]['plo']
app.get("/api/course/mapping/:id", async (request, response) => {
  const course = await courseModel.findById(request.params.id);

  try {
    response.send(course.mapping);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/api/create-course", async (request, response) => {
  const course = new courseModel(request.body);

  try {
    await course.save();
    response.send(course);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/api/delete-course/:id", async (request, response) => {
  try {
    const course = await courseModel.findByIdAndDelete(request.params.id);

    if (!course) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
