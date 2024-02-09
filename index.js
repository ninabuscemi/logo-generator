const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function runLogoGenerator() {
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
  let shapeSize = 200;
  let svgShape;
  let textX = 100;
  let textY = 100;

  switch (shape) {
    case 'circle':
      svgShape = new Circle(shapeSize / 2, shapeColor).render();
      break;
    case 'triangle':
      const triangleWidth = 200;
      svgShape = new Triangle(shapeColor).render();
      // Adjust only the text coordinates for the triangle
      textY += 48;
      textX += 48;
      break;
    case 'square':
      svgShape = new Square(shapeSize, shapeColor).render();
      break;
    default:
      throw new Error('Invalid shape');
  }

  const svgText = `<text x="${textX}" y="${textY}" font-size="60" text-anchor="middle" dominant-baseline="central" fill="${textColor}">${text}</text>`;

  return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${svgShape}${svgText}</svg>`;
}

  try {
    const userInput = await getUserInput();
    const svgContent = generateSVG(userInput);
    const timestamp = Date.now(); // Get current timestamp
    const filePath = `./examples/logo_${timestamp}.svg`; // Includes timestamp in filename
    fs.writeFileSync(filePath, svgContent);
    console.log('Logo generated successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  }

  const circle = new Circle(50, 'red');
  const triangle = new Triangle('blue');
  const square = new Square(100, 'green');
}

runLogoGenerator();
