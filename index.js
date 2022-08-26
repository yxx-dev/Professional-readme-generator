//Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
//an array of questions for user input
//const questions = ['What is the title of your project?', 'Enter project descriptions:', 'Enter installation instructions:', 'Enter usage info:', 'Enter contribution guidelines:', 'Enter test instructions:', 'License:', 'Enter GitHub username:', 'Enter email address:', 'Questions'];
// 'Enter Table of Contents:'?





//function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./${fileName}.md`, '', err => err ? console.error(err) : console.log(`${fileName}.md file created`));
    
    fs.writeFile(`./${fileName}.md`, data, err => err ? console.error(err) : console.log(`${fileName}.md file saved`));
    
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
            choices: ['MIT', 'BSD', 'Apache 2.0', 'Other'],
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
        writeToFile('README-generated',JSON.stringify(answers));
        });
    //.catch(err ? err => console.log(err) : console.log('recorded'));
}

// Function call to initialize app
init();
