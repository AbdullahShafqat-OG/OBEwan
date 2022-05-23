const express = require('express');
const studentModel = require('../models/student.model');
const activityModel = require('../models/activity.model');
const app = express();

app.put('/api/create-student-record', async (request, response) => {
  const activityId = request.body.activityId;
  const activity = await activityModel.findById(activityId);

  // calculating the clo score according to weightage assigned to activity
  const cloScore =
    (request.body.marks / activity.maxMarks) * activity.weightage;

  let student = await studentModel.find({ regNo: request.body.regNo });

  const newMarks = {
    marks: request.body.marks,
    cloScore: cloScore,
    activityId: activityId,
  };

  if (student.length === 0) {
    student = new studentModel({
      regNo: request.body.regNo,
      name: request.body.name,
      marksArr: [newMarks],
    });

    try {
      await student.save();
      response.send(student);
    } catch (error) {
      response.status(500).send(error);
    }
  } else {
    try {
      const index = student[0].marksArr.findIndex((arr) => {
        return arr.activityId === activityId;
      });

      if (index === -1) {
        const updatedStudent = await studentModel.updateOne(
          { regNo: request.body.regNo },
          {
            $push: {
              marksArr: newMarks,
            },
          }
        );

        response.send(updatedStudent);
      } else {
        throw new Error('Marks for the activity have already been added');
      }
    } catch (error) {
      response.status(500).send(error.toString());
    }
  }
});

module.exports = app;
