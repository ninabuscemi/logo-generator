const inquirer = require('inquirer'); // Provides command line user interfaces
const fs = require('fs'); // Used to read from and write to files
const { Shape, Triangle, Square, Circle } = require('./lib/shapes.js');

function validateColor(color) {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(color);
}

async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: function (input) {
        return input.length <= 3 ? true : 'Please enter up to three characters.';
      }
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color:',
      validate: function (input) {
        const isValid = validateColor(input);
        return isValid ? true : 'Please enter a valid color.';
      }
    },
    {
      name: 'shape',
      type: 'list',
      message: 'Choose a preferred shape:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      name: 'shapeColor',
      type: 'input',
      message: 'Enter a color keyword or hexadecimal for shape color:'
    }
  ]);

  return answers;
}

