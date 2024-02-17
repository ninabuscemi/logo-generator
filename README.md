# Logo Generator

## Description

Logo Generator is a Node.js command-line application that takes in user input to generate a logo and save it as an SVG file. This application prompts the user to select a color and shape, provide text for the logo, and save the generated SVG to a .svg file.

## User Story 

AS a freelance web developer
I WANT to generate a simple logo for my projects
SO THAT I don't have to pay a graphic designer

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I am prompted for text
THEN I can enter up to three characters
WHEN I am prompted for the text color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I am prompted for a shape
THEN I am presented with a list of shapes to choose from: circle, triangle, and square
WHEN I am prompted for the shape's color
THEN I can enter a color keyword (OR a hexadecimal number)
WHEN I have entered input for all the prompts
THEN an SVG file is created named `logo.svg`
AND the output text "Generated logo.svg" is printed in the command line
WHEN I open the `logo.svg` file in a browser
THEN I am shown a 300x200 pixel image that matches the criteria I entered

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory in the terminal.
3. Run npm install to install the required dependencies.
4. Run the application using node index.js.

## Contributing

Contributions to the ReadMe-Print Generator are welcome! If you find any issues or have suggestions for improvements, please submit a pull request. Make sure to follow the repository's code style and guidelines.