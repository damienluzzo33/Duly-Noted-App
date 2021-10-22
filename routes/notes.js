const { readFromFile, writeToFile, readAndAppend } = require('../helpers/utility');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const database = require('../db/db');
const fs = require('fs');

const notes = require('express').Router();

// Make get call to read the db.json file and return the saved notes as JSON
notes.get('/', (req, res) => {
	readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Set up ability for user to POST the data at /api/notes when they submit their new note to the notes list
notes.post('/', (req, res) => {
	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
			// Use UUID to get a unique id for each submitted note
			id: uuidv4()
		};
		readAndAppend(newNote, './db/db.json');
		res.json('Note was successfully added!');
	} else {
		res.status(404).send('Error! Note not added!');
	}
});

// Add ability for user to DELETE an object based on the unique ID
notes.delete('/:id', (req, res) => {
	// Need to read the database at db.json and remove the note based on the unique ID
	let allData = path.join(__dirname, '../db/db.json');
	console.log(database);

	for (let i = 0; i < database.length; i++) {
		console.log(database);
		if (database[i].id == req.params.id) {
			// const index = allData.indexOf(note);
			console.log(req.params.id);
			console.log(database[i].id);
			database.splice(i, 1);
		}
	}

	fs.writeFile(allData, JSON.stringify(database), (err) => {
		if (err) console.log('Something went wrong', err);
		else res.json(database);
	});
});

const readAndDelete = (id,file) => {
    if (err) {
        console.error(err);
    } else {
        const parsedData = JSON.parse(data);
        parsedData.forEach(data) 
    }
}

module.exports = notes;
