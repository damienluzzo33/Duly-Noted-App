//* Import modules needed for application
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

//* Start Express Server Setup

//* Add port/server function at the bottom

//* Set up ability for user to get the data, and call it later on when user clicks the open the notes.

//* Make get call to /notes and display notes.html page

//* Make get call to * to return index.html file

//* Make get call to read the db.json file and return the saved notes as JSON 

//* Set up ability for user to POST the data at /api/notes when they submit their new note to the notes list

//* Use UUID to get a unique id for each submitted note

//* Add ability for user to DELETE an object based on the unique ID 

//* Need to read the database at db.json and remover the note based on the unique ID and then re render the notes with the deleted one removed

