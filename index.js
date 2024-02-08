const fs = require('fs');
const inquirer = require('inquirer');

async function getUserInput() {
    const answers = await inquirer.prompt([
        {
            name: 'text',
            type: 'input',
            message: 'Enter One to three characters for the logo:',
            validate: input => input.length <= 3
        },
        {
            name: 'textColor',
            type: 'input',
            message: 'Enter a color keyword or hexadecimal for your preferred text color:'
        },
        {
            name: 'shape',
            type: 'list',
            message: 'Choose a Preferred shape:',
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

function generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeObject;

    switch (shape) {
        case 'circle':
            shapeObject = new Circle(shapeColor);
            break;
        case 'triangle':
            shapeObject = new Triangle(shapeColor);
            break;
        case 'square':
            shapeObject = new Square(shapeColor);
            break;
        default:
            throw new Error('Invalid shape');
    }

    const svgHeader = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
    const svgFooter = `</svg>`;

    const svgShape = shapeObject.draw();
    const svgText = `<text x="150" y="100" font-size="20" text-anchor="middle" dominant-baseline="central" fill="${textColor}">${text}</text>`;

    return svgHeader + svgShape + svgText + svgFooter;
}

async function main() {
    try {
        const userInput = await getUserInput();
        const svgContent = generateSVG(userInput);
        fs.writeFileSync('logo.svg', svgContent);
        console.log('Logo generated successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();