// import built in node modules
const fs = require('fs');
const util = require('util');
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
// Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
// Function to read data from a given a file and append some content
const readAndAppend = (content, file) => {
  // read the file with fs built-in module
  fs.readFile(file, 'utf8', (err, data) => {
    // if there's an error, print it to console
    if (err) {
      console.error(err);
      // otherwise, parse the data, then take the content passed into the function and push it into the parsedData array
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      // then use the writeToFile function to overwrite file data with the newly appended parsedData array
      writeToFile(file, parsedData);
    }
  });
};
// export the functions we want to use
module.exports = { readFromFile, writeToFile, readAndAppend };