const express = require('express');
const studentModel = require('../models/student.model');
const app = express();

app.put('/api/create-student-record', async (request, response) => {
  let student = await studentModel.find({ regNo: request.body.regNo });

  if (student.length === 0) {
    student = new studentModel(request.body);

    try {
      await student.save();
      response.send(student);
    } catch (error) {
      response.status(500).send(error);
    }
  } else {
    const newMarks = request.body.marksArr;

    try {
      if (student.marksArr.indexOf(newMarks) === -1) {
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
        throw new Error('Adding duplicate marks');
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }
});

module.exports = app;
