const express = require("express");
const courseModel = require("../models/course.model");
const app = express()

app.get("/api/course-list", async (request, response) => {
    const courses = await courseModel.find({});

    try {
        response.send(courses);
    } catch (error) {
        response.status(500).send(error);
    }
});

// returns all courses assigned to instructor
// [
//     {
//         "_id": "6262881c57bbb627aca6ab30",
//         "code": "SE-320",
//         "name": "Machine Learning",
//         "instructor": "machine@mail.com",
//         "mapping": [
//             {
//                 "clo": "CLO-1",
//                 "plo": [
//                     "PLO-1",
//                     "PLO-2",
//                     "PLO-500",
//                     "PLO-501"
//                 ],
//                 "_id": "6262881c57bbb627aca6ab31"
//             },
//             {
//                 "clo": "CLO-2",
//                 "plo": [
//                     "PLO-3",
//                     "PLO-5",
//                     "PLO-69",
//                     "PLO-1000"
//                 ],
//                 "_id": "6262881c57bbb627aca6ab32"
//             }
//         ],
//         "__v": 0
//     }
// ]
app.get("/api/course-list/:email", async (request, response) => {
    const courses = await courseModel.find(
        {}
    ).where({ instructor: request.params.email });

    try {
        response.send(courses);
    } catch (error) {
        response.status(500).send(error);
    }
});

// OUTDATED
// returns an array of strings
// [
//     "seema@mail.com",
//     "majid@mail.com"
// ]
// app.get("/api/course/instructor-list/:id", async (request, response) => {
//     const course = await courseModel.findById(request.params.id);

//     try {
//         response.send(course.instructors);
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

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

// route for creating a new mapping 
// three parameters 
// id of course that for which mapping clos and plos
// name of clo to be mapped onto i.e. "CLO-1"
// name of plo to map i.e. "PLO-3"
app.patch("/api/create-mapping/:id/:cloname/:ploname", async (request, response) => {
    const reducedCourse = await courseModel.findOne({ _id: request.params.id }).
        select({ mapping: {$elemMatch: {clo: request.params.cloname}} });

    const ploList = reducedCourse.mapping[0].plo;

    try {
        if (ploList.indexOf(request.params.ploname) === -1) {
            ploList.push(request.params.ploname);
        }
        else {
            throw new Error('Mapping duplicate PLO');
        }

        const updatedCourse = await courseModel.updateOne(
            { _id: request.params.id, "mapping.clo": request.params.cloname },
            {
                $set: {
                    "mapping.$.plo": ploList,
                }
            }
        );

        // console.log(updatedCourse);
        response.send(updatedCourse);
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