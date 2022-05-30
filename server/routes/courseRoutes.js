const express = require('express');
const courseModel = require('../models/course.model');
const app = express();

// @param id is the course code like 627b5a9d9296a89f4bcccdf0
// @returns course object from the database
// {
//   "_id",
//   "code",
//   "name",
//   "instructor",
//   "mapping"
// }
app.get('/api/get-course/:id', async (request, response) => {
  const course = await courseModel.findById(request.params.id);

  try {
    response.send(course);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @returns all the course objects from the database
// [{course object 1}, {course object 2}]
app.get('/api/course-list', async (request, response) => {
  const courses = await courseModel.find({});

  try {
    response.send(courses);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @returns clo list for a particular plo and course
app.post('/api/course-clo-list', async (request, response) => {
  const courses = await courseModel.find({ code: request.body.course });

  const mappings = courses[0].mapping;

  // destructuring mapping into array of clos
  // const clos = mappings.mapping.map((mapping) => mapping.clo);
  let clos = [];

  mappings.forEach((mapping) => {
    if (mapping.plo.indexOf(request.body.plo) !== -1) {
      clos.push(mapping.clo);
    }
  });

  try {
    response.send(clos);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @params id of course like 627b5a9d9296a89f4bcccdf0
// @returns an array of strings
// [
//     "seema@mail.com",
//     "majid@mail.com"
// ]
app.get('/api/course/instructor-list/:id', async (request, response) => {
  const course = await courseModel.findById(request.params.id);

  try {
    response.send(course.instructors);
  } catch (error) {
    response.status(500).send(error);
  }
});

// @params id of course like 627b5a9d9296a89f4bcccdf0
// @returns an array of dictionaries
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
app.get('/api/course/mapping/:id', async (request, response) => {
  const course = await courseModel.findById(request.params.id);

  try {
    response.send(course.mapping);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/api/create-course', async (request, response) => {
  console.log(request.body);
  const course = new courseModel(request.body);

  try {
    await course.save();
    response.send(course);
  } catch (error) {
    response.status(500).send(error);
  }
});

// route for creating a new mapping
// three parameters
// id of course that for which mapping clos and plos
// name of clo to be mapped onto i.e. "CLO-1"
// name of plo to map i.e. "PLO-3"
app.patch('/api/create-mapping/:id', async (request, response) => {
  const cloMapping = await courseModel
    .findById(request.params.id)
    .select({ mapping: { $elemMatch: { clo: request.body.clo } } });

  if (cloMapping.mapping.length === 0) {
    try {
      const newMapping = {
        clo: request.body.clo,
        plo: [request.body.plo],
      };

      const updatedCourse = await courseModel.updateOne(
        { _id: request.params.id },
        {
          $push: {
            mapping: newMapping,
          },
        }
      );

      response.send(updatedCourse);
    } catch (error) {
      response.status(500).send(error);
    }
  } else {
    const ploList = cloMapping.mapping[0].plo;

    try {
      if (ploList.indexOf(request.body.plo) === -1) {
        ploList.push(request.body.plo);
      } else {
        throw new Error('Mapping duplicate PLO');
      }

      const updatedCourse = await courseModel.updateOne(
        { _id: request.params.id, 'mapping.clo': request.body.clo },
        {
          $set: {
            'mapping.$.plo': ploList,
          },
        }
      );

      // console.log(updatedCourse);
      response.send(updatedCourse);
    } catch (error) {
      response.status(500).send(error);
    }
  }
});

// @params id of course like 627b5a9d9296a89f4bcccdf0
// @returns model of deleted course object
// {
//   "_id",
//   "code",
//   "name",
//   "instructor",
//   "mapping"
// }
app.delete('/api/delete-course/:id', async (request, response) => {
  try {
    const course = await courseModel.findByIdAndDelete(request.params.id);

    if (!course) response.status(404).send('No item found');
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
