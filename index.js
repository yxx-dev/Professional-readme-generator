//Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

let readMeFileName = 'README-generated';
//an array of questions for user input
const questions = ['What is the title of your project?', 'Enter project descriptions:', 'Enter installation instructions:', 'Enter usage info:', 'Enter contribution guidelines:', 'Enter test instructions:', 'License:', 'Enter GitHub username:', 'Enter email address:', 'Questions'];


// 'Enter Table of Contents:'?





//function to write README file
function writeToFile(fileName, title) {
    //create or clear readMeFileName file
    fs.writeFile(`./${fileName}.md`, '', err => err ? console.error(err) : console.log(`${fileName}.md file created`));
    //writte title
    fs.writeFile(`./${fileName}.md`, title, err => err ? console.error(err) : console.log('title recorded'));
}

//function to append to README file
function appendToFile(fileName, data) {
     //append info to file
    fs.appendFile(`./${fileName}.md`, data, err => err ? console.error(err) : console.log('data recorded'));
}

//function to initialize app
function init() {
    //writeToFile(process.argv[2], process.argv[3]);

    //for (i=0; i<questions.length; i++) {

   //};
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Enter project descriptions:',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Enter installation instructions:',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'Enter usage info:',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'Enter contribution guidelines:',
            name: 'contribution',
        },
        {
            type: 'input',
            message: 'Enter test instructions:',
            name: 'test',
        },
        {
            type: 'list',
            message: 'License:',
            name: 'license',
            choices: ['MIT', 'BSD', 'Apache 2.0', `Others`],
        },
        {
            type: 'input',
            message: 'Enter GitHub username:',
            name: 'github',
        },
        {
            type: 'input',
            message: 'Enter email address:',
            name: 'email',
        },
        {
            type: 'input',
            message: 'Questions',
            name: 'questions',
        },
    ])
    .then(answers => {
        //console.log(answers);
        writeToFile(readMeFileName,`# ${answers.title}\n`);
        appendToFile(readMeFileName, `\n## Description\n${answers.description}\n`);
        });
    //.catch(err ? err => console.log(err) : console.log('recorded'));
}

// Function call to initialize app
init();
