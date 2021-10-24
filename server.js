// Start Express Server Setup
const express = require('express');
const path = require('path');
// import and set up the api router 
const api = require('./routes/index');
// define the PORT variable
const PORT = process.env.port || 3001;
// initialize express app
const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set up middleware for html routes using paths in the public folder
app.use(express.static('public'));
// Make get call to /notes and display notes.html page
app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/notes.html'));
});
// use the api router when /api path is hit
app.use('/api', api);
// Make get call to * to return index.html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});
// Add port/server listener at the bottom of the file
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));