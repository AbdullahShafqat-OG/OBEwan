# OBEwan [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![npm: version](https://img.shields.io/npm/v/npm)
## SE-312 Project

### 💡 Inspiration
The problem of making an outcome-based assessment tool seemed liked a complex and challenging problem to all of us. Therefore, we decided to give it a shot and see what we could come up with.

### ✨ What it does
OBE-WAN is a tool for generating Course Learning Outcomes (CLO) and Program Learning Outcomes (PLO) reports of students for different courses. Features:
- Users can create new Courses, PLOs, and CLOs  
- Users can map the CLOs of any course onto corresponding PLOs  
- Users can create and adjust weightages of different activites of any course  
- Users can upload marks attainment report of students for any course in .xlsx format  
- Users can see the PLO and CLO reports generated by the tool

### 🔨 How we built it
The front-end of was created with React.js and Material UI. For storing the data about different CLOs, PLOs, and students MongoDB was used as the database. All the data stored in MongoDB is modelled as objects using the Mongoose library. To access the data stored in the database API endpoints in Express.js and Node.js on a backend server were setup.
UI was constructed in Figma for the app and coded using the Material UI library for React.
Project timeline was managed on Trello and collboration was done through Github.

### 🧠 What we learned
The project was a meant as a learning opportunity and we learned a lot of new technologies along the way. We also learned the importance of laying out the design and architecture of a complex system instead of jumping right into coding.

### 🔮 Future Additions
Seperate Admin and Instructor portals  
Option to download the generated PLO and CLO reports

## Getting Started
Clone the repository in a directory and run the following commands in seperate terminals
```git clone 
cd server
npm install .
nodemon server
```
```
cd client
npm install .
npm start
```

## Tests
Information about the tests conducted and how to run them on your system

## Licensing
MIT License  

Copyright (c) 2022 OBEwan
