const express = require('express');
const mongoose = require('mongoose');

const foodRouter = require('./routes/foodRoutes.js');
const instructorRouter = require('./routes/instructorRoutes.js');
const ploRouter = require('./routes/ploRoutes.js');
const cloRouter = require('./routes/cloRoutes.js');
const courseRouter = require('./routes/courseRoutes.js');
const activityRouter = require('./routes/activityRoutes.js');

const app = express();

app.use(express.json());

ATLAS_URI =
  'mongodb+srv://Abdullah:Abdullah@cluster0.w6ype.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(ATLAS_URI, { useUnifiedTopology: true });

app.use(foodRouter);
app.use(instructorRouter);
app.use(ploRouter);
app.use(cloRouter);
app.use(courseRouter);
app.use(activityRouter);

app.listen(4000, () => {
  console.log('Server running on Port: 4000...');
});
