// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown')
// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project? (Required)",
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter your project title.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Briefly give a description of your project. (Required)",
        validate: description => {
          if (description) {
            return true;
          } else {
            console.log("Please write a short description.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "installInfo",
        message: "Provide any installation instructions here:",
      },
      {
        type: 'checkbox',
        name: 'license',
        message: 'Which license is used for this project:',
        choices: ['Apache', 'Mozilla', 'MIT', 'GNU', 'Boost', 'ISC'],
        validate: choicesLength => {
          if (choicesLength.length <= 1) {
            return true;
          } else {
            return "Please select one license!";
          }
        }
      },
      {
        type: "input",
        name: "usageInfo",
        message: "Describe the use case for this project/application:",
      },
      {
        type: "input",
        name: "contributionsInfo",
        message: "Are their any guidelines for contributing to this project:",
      },
      {
        type: "input",
        name: "testsInfo",
        message: "Which tests would you like to include:",
      },
      {
        type: "input",
        name: "githubUsername",
        message: "What is your GitHub username (Required)?",
        validate: username => {
            if (username) {
              return true;
            } else {
              console.log("Please provide your GitHub username.");
              return false;
            }
          }
      },
      {
        type: "input",
        name: "emailInfo",
        message: "What is your email (Required)?",
        validate: email => {
            if (email) {
              return true;
            } else {
              console.log("Please provide your email.");
              return false;
            }
          }
      }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile("./generate/README.md", generateMarkdown(data), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('Success!');
      });


}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(function(answer) {
      const fileName =
        answer.title
          .split(' ')
          .join('') + '.md';
      
      writeToFile(fileName, answer);
    });



}

// Function call to initialize app
init();
