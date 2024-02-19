// Importing required modules
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

// Asynchronous function to run the logo generator
async function runLogoGenerator() {
  // Dynamic import of 'inquirer' package for user input
  const { default: inquirer } = await import('inquirer');

  // Asynchronous function to get user input using inquirer prompts
  async function getUserInput() {
    // Prompting user for input
    const answers = await inquirer.prompt([
      {
        name: 'text',
        type: 'input',
        message: 'Enter One to three characters for the logo:',
        // Validation to ensure input length is within limits
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

  // Function to generate SVG based on user input
  function generateSVG({ text, textColor, shape, shapeColor }) {
    // Default shape size
    let shapeSize = 200;
    let svgShape;
    // Default text position
    let textX = 100;
    let textY = 100;

    // Determining shape based on user input
    switch (shape) {
      case 'circle':
        // Creating a circle SVG element
        svgShape = new Circle(shapeSize / 2, shapeColor).render();
        break;
      case 'triangle':
        // Creating a triangle SVG element
        const triangleWidth = 200;
        svgShape = new Triangle(shapeColor).render();
        textY += 48;
        textX += 48;
        break;
      case 'square':
        // Creating a square SVG element
        svgShape = new Square(shapeSize, shapeColor).render();
        break;
      default:
        // Handling invalid shape input
        throw new Error('Invalid shape');
    }

    // Generating SVG text element
    const svgText = `<text x="${textX}" y="${textY}" font-size="60" text-anchor="middle" dominant-baseline="central" fill="${textColor}">${text}</text>`;
    // Combining SVG shape and text elements
    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">${svgShape}${svgText}</svg>`;
  }

  try {
    // Reading the counter from a file or setting it to 1 if it doesn't exist
    let counter = fs.existsSync('./examples/counter.txt') ? parseInt(fs.readFileSync('./examples/counter.txt', 'utf-8')) : 1;
    
    // Getting user input
    const userInput = await getUserInput();
    // Generating SVG content based on user input
    const svgContent = generateSVG(userInput);
    // Constructing file name based on input and counter
    const fileName = `logo_${userInput.text}_${counter}.svg`;
    // Constructing file path
    const filePath = `./examples/${fileName}`;
    // Writing SVG content to file
    fs.writeFileSync(filePath, svgContent);
    // Incrementing the counter for the next logo
    counter++;
    // Logging successful logo generation
    console.log('Logo generated successfully!');
  } catch (error) {
    // Handling errors
    console.error('Error:', error.message);
  }

  // Creating instances of shapes (unused in this code)
  const circle = new Circle(50, 'red');
  const triangle = new Triangle('blue');
  const square = new Square(100, 'green');
}

// Calling the logo generator function
runLogoGenerator();
