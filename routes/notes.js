// import helper functions from utility file
const { readFromFile, readAndAppend } = require('../helpers/utility');
// set up uuid, path, and fs module imports
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
// get the database file imported and stored in variable
const database = require('../db/db');
// set up router for the notes paths
const notes = require('express').Router();
// Make get call to read the db.json file and return the saved notes
notes.get('/', (req, res) => {
	readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// Set up ability for user to POST the data at /api/notes when they submit their new note to the notes list
notes.post('/', (req, res) => {
	const { title, text } = req.body;
	// if a req.body was passed in, make a new note using the text and title, as well as a generated unique id
	if (req.body) {
		const newNote = {
			title,
			text,
			// Use UUID to get a unique id for each submitted note
			id: uuidv4()
		};
		// read and append the added note to the database
		readAndAppend(newNote, './db/db.json');
		// let user know it was successful
		res.json('Note was successfully added!');
	} else {
		// otherwise throw an error
		res.status(404).send('Error! Note not added!');
	}
});
// Add ability for user to DELETE an object based on the unique ID
notes.delete('/:id', (req, res) => {
	// Need to read the database at db.json and remove the note based on the unique ID
	let allData = path.join(__dirname, '../db/db.json');
	// loop over database array
	for (let i = 0; i < database.length; i++) {
		// if the object from the array has the same id as the id of object user wants to delete
		if (database[i].id == req.params.id) {
			// splice the array and remove selected object from the data array
			database.splice(i, 1);
		}
	}
	// overwrite the json file with the user data with the newly spliced data
	fs.writeFile(allData, JSON.stringify(database), (err) => {
		// if there's an error, console.log the message and the error
		if (err) console.log('Something went wrong', err);
		// otherwise, return the response with newly spliced data
		else res.json(database);
	});
});
// export the notes
module.exports = notes;