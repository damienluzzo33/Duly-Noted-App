// import express module
const express = require('express');
// import the notes router from the notes.js file
const notesRouter = require("./notes");
// initialize the express app
const app = express();
// use the notes router for any route that includes /notes
app.use("/notes", notesRouter);
// export the express app
module.exports = app;