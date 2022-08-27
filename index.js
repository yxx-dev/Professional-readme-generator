//Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

let readMeFileName = 'README-generated';
//an array of questions for user input
const questions = ['What is the title of your project?', 'Enter project descriptions:', 'Enter installation instructions:', 'Enter usage info:', 'Enter contribution guidelines:', 'Enter test instructions:', 'License:', 'Enter GitHub username:', 'Enter email address:', 'Questions'];
const tableOfContent = ['Installation', 'Usage', 'How-to-Contribute', 'Tests', 'License', 'Questions'];
let tableOfContentHTML = '';
let userAnswers;

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


//function to write README file
function writeToFile(fileName, title) {
    //create or clear readMeFileName file
    fs.writeFile(`./${fileName}.md`, '', () => {
        //writte title
        fs.writeFile(`./${fileName}.md`, `# ${title}\n`, err => err ? console.error(err) : console.log('title recorded'))
    }
    );
}

//function to finalize README file
function generateReadMe() {
    //create or clear README
    fs.writeFile(`./${readMeFileName}.md`, '', () => {
        //writte title, then the rest - undesired callback hell
        fs.writeFile(`./${readMeFileName}.md`, `# ${userAnswers.title}\n`, () => {
            fs.appendFile(`./${readMeFileName}.md`, `\n## Description\n${userAnswers.description}\n`, () => {
                fs.appendFile(`./${readMeFileName}.md`, `\n## Table of Contents\n${tableOfContentHTML}`, () => {
                    fs.appendFile(`./${readMeFileName}.md`, `\n## Installation\n${userAnswers.installation}\n`, () => {
                        fs.appendFile(`./${readMeFileName}.md`, `\n## Usage\n${userAnswers.usage}\n`, () => {
                            fs.appendFile(`./${readMeFileName}.md`, `\n## How to contribute\n${userAnswers.contribution}\n`, () => {
                                fs.appendFile(`./${readMeFileName}.md`, `\n## Tests\n${userAnswers.test}\n`, () => {
                                    fs.appendFile(`./${readMeFileName}.md`, `\n## License\n${userAnswers.license}\n`, () => {
                                        fs.appendFile(`./${readMeFileName}.md`, `\n## Questions\nGitHub username: ${userAnswers.github}  \n[Link to GitHub](https://github.com/${userAnswers.github})  \nEmail your question to: ${userAnswers.email}\n`, (err) => {
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


/*

                                        fs.appendFile(`./${readMeFileName}.md`, `\n## GitHub\nGitHub Username: ${userAnswers.github}\n[link to GitHub](https://github.com/${userAnswers.github})\n`, () => {
                                            fs.appendFile(`./${readMeFileName}.md`, `\n## Email\n${userAnswers.email}\n`, () => {
                                                fs.appendFile(`./${readMeFileName}.md`, `\n## Questions\n${userAnswers.questions}\n`, (err) => {
                                                    err ? console.error(err) : console.log('data recorded');
                                                });
                                            });
                                        });

*/