const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function runLogoGenerator() {
  const { default: inquirer } = await import('inquirer');

  async function run() {
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
      let svgShape;

      switch (shape) {
        case 'circle':
          shapeSize = 200; // Adjusts the size of the circle
          shapeObject = new Circle(shapeSize / 2, shapeColor); // Sets the radius as half the size
          svgShape = shapeObject.draw(); // Assigns svgShape for circle
          break;
        case 'triangle':
          shapeSize = 200; // Adjusts the size of the triangle
          shapeObject = new Triangle(shapeColor); // Creates Triangle object
          const triangleWidth = 200; // Adjusts the width of the triangle
          const triangleX = 100; 
          const triangleY = 100; 
          svgShape = shapeObject.draw(triangleWidth, triangleX, triangleY); 
          break;
        case 'square':
          shapeSize = 200; 
          shapeObject = new Square(shapeSize, shapeColor);
          svgShape = shapeObject.draw();
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
      let textX = centerX;
      let textY = centerY;

    if (shape === 'triangle') {
        textY += 38;
        textX += 5;
    }

      const svgText = `<text x="${textX}" y="${textY}" font-size="60" text-anchor="middle" dominant-baseline="central" fill="${textColor}">${text}</text>`; // Set the position of the text

      return svgHeader + svgShape + svgText + svgFooter;
    }

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

  await run();
}

runLogoGenerator();