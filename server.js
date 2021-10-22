//* Start Express Server Setup
const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Make get call to /notes and display notes.html page
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.use('/api', api);

// Make get call to * to return index.html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Add port/server function at the bottom
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
