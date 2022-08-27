//Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

//define a uniform readme name
let readMeFileName = 'README-generated';
//an array of questions for user input
//const questions = ['What is the title of your project?', 'Enter project descriptions:', 'Enter installation instructions:', 'Enter usage info:', 'Enter contribution guidelines:', 'Enter test instructions:', 'License:', 'Enter GitHub username:', 'Enter email address:', 'Questions'];
const tableOfContent = ['Installation', 'Usage', 'How-to-Contribute', 'Tests', 'License', 'Questions'];
let tableOfContentHTML = '';
let userAnswers;
let licenseBadge = '';

//generate table of content
for (let i=0; i<tableOfContent.length; i++) {
    tableOfContentHTML += `${i+1}. [${tableOfContent[i]}](#${tableOfContent[i]})\n`
}

//prompting for README entries
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
        /*
        {
            type: 'input',
            message: 'Questions',
            name: 'questions',
        },
        */
    ])
    .then(answers => {
        userAnswers=answers;

        generateReadMe();
    });
    //.catch(err ? err => console.log(err) : console.log('recorded'));

//function to finalize README file
function generateReadMe() {
    //port license details
    licenseDetails(userAnswers.license);
    //create or clear README
    fs.writeFile(`./${readMeFileName}.md`, '', () => {
        //writte title, then the rest - callback hell could be improved
        fs.writeFile(`./${readMeFileName}.md`, `# ${userAnswers.title}\n`, () => {
            fs.appendFile(`./${readMeFileName}.md`, `\n## Description\n${userAnswers.description}\n`, () => {
                fs.appendFile(`./${readMeFileName}.md`, `\n## Table of Contents\n${tableOfContentHTML}`, () => {
                    fs.appendFile(`./${readMeFileName}.md`, `\n## Installation\n${userAnswers.installation}\n`, () => {
                        fs.appendFile(`./${readMeFileName}.md`, `\n## Usage\n${userAnswers.usage}\n`, () => {
                            fs.appendFile(`./${readMeFileName}.md`, `\n## How to contribute\n${userAnswers.contribution}\n`, () => {
                                fs.appendFile(`./${readMeFileName}.md`, `\n## Tests\n${userAnswers.test}\n`, () => {
                                    fs.appendFile(`./${readMeFileName}.md`, `\n## License\n${licenseBadge}\n`, () => {
                                        fs.appendFile(`./${readMeFileName}.md`, `\n## Questions\nGitHub: [${userAnswers.github}](https://github.com/${userAnswers.github})  \nKindly email your question(s) to: ${userAnswers.email}\n`, (err) => {
                                            err ? console.error(err) : console.log('data recorded');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
    });
}

function licenseDetails (lic) {
    switch (lic) {
        case 'MIT':
            licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;  
        case 'BSD':
            licenseBadge = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
            break;  
        case 'Apache 2.0':
            licenseBadge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;  
        default:
            licenseBadge = 'Manually input license details'
    }

}