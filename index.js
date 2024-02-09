const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function run() {
  const { default: inquirer } = await import('inquirer');

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
        name: 'shapeColor',
        type: 'input',
        message: 'Enter a color keyword or hexadecimal for shape color:'
      },
      {
        name: 'shape',
        type: 'list',
        message: 'Choose a Preferred shape:',
        choices: ['circle', 'triangle', 'square']
      },
    ]);
    return answers;
  }

function generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeObject;
    let shapeSize;

    switch (shape) {
        case 'circle':
            shapeSize = 200; // Adjust the size of the circle
            shapeObject = new Circle(shapeSize / 2, shapeColor); // Set the radius as half the size
            break;
        case 'triangle':
            shapeSize = 200; // Adjust the size of the triangle
            shapeObject = new Triangle(shapeSize, shapeColor); // Use the size directly for the triangle
            break;
        case 'square':
            shapeSize = 200; // Adjust the size of the square
            shapeObject = new Square(shapeSize, shapeColor); // Use the size directly for the square
            break;
        default:
            throw new Error('Invalid shape');
    }

    const svgHeader = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
    const svgFooter = `</svg>`;


    const centerX = 100;
    const centerY = 100;


    const shapeX = centerX - (shapeSize / 2);
    const shapeY = centerY - (shapeSize / 2);
    const textX = centerX;
    const textY = centerY;

    const svgShape = shapeObject.draw(shapeX, shapeY); // Pass the position of the shape
    const svgText = `<text x="${textX}" y="${textY}" font-size="60" text-anchor="middle" dominant-baseline="central" fill="${textColor}">${text}</text>`; // Set the position of the text

    return svgHeader + svgShape + svgText + svgFooter;
}

  async function main() {
    try {
      const userInput = await getUserInput();
      const svgContent = generateSVG(userInput);
      const filePath = './examples/logo.svg';
      fs.writeFileSync(filePath, svgContent);
      console.log('Logo generated successfully!');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  await main();
}

run();