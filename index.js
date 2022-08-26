//Include packages needed for this application
const inquirer = require(`inquirer`);
const fs = require('fs');
//an array of questions for user input
const questions = ['what is the title of your project?', 'Enter project descriptions:', 'Enter installation instructions:', 'Enter usage info:', 'Enter contribution guidelines:', 'Enter test instructions:', 'License:', 'Enter GitHub username:', 'Enter email address:', 'Questions'];
// 'Enter Table of Contents:'?


//function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName}.md`, data, err => err ? console.error(err) : console.log(`${fileName}.md file saved`));
}

// TODO: Create a function to initialize app
function init() {
    writeToFile(process.argv[2], process.argv[3]);
}

// Function call to initialize app
init();
