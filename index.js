const inquirer = require('inquirer'); // Provides command line user interfaces
const fs = requrire('fs'); // Used to read from and write to files
const { Shape, Triangle, Square, Circle } = require('./lib/shapes.js');

// Function to prompt the user for input
inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three caharcters:',
            validate: function (input) {
                return input.length <=3 ? true: 'Please enter up to three characters.';
            }
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color:',
            validate: function (input) {
                const isValid = validateColor(input);
                return isValid;
            }
        },
        {
            name: 'shape',
            type: 'list',
            message: 'Choose a Preferred shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            name: 'shapecolor',
            type: 'input',
            message: 'Enter a color keyword for hexideacimal for shape color'
        },
    ]);