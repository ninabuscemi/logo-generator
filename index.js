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
            shapeObject = new Circle(50, shapeColor);
            break;
        case 'triangle':
            shapeObject = new Triangle(100, shapeColor);
            break;
        case 'square':
            shapeObject = new Square(100, shapeColor);
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