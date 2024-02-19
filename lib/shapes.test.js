// Importing shape classes from the shapes module
const { Circle, Triangle, Square } = require('./shapes');

// Test case for rendering a circle SVG
test('should render a circle SVG', () => {
    // Creating a circle instance with specified parameters
      const circle = new Circle(50, 'red');
    // Rendering a SVG representation of the circle
      const svg = circle.render();
    // Assertions for expected SVG attributes
      expect(svg).toContain('<circle');
      expect(svg).toContain('cx="50"');
      expect(svg).toContain('cy="50"');
      expect(svg).toContain('r="50"');
      expect(svg).toContain('fill="red"');
    });

// Test for rendering a triangle SVG
test('should render a triangle SVG', () => {
    // Creating a triangle instance with specified color
      const triangle = new Triangle('blue');
    // Rendering SVG representation of the triangle
      const svg = triangle.render();
    // Assertions for the expected SVG attributes
      expect(svg).toContain('<polygon');
      expect(svg).toContain('fill="blue"');
    });

// Test for rendering a square SVG
test('should render a square SVG', () => {
    // Creating a square instance with specified parameters
      const square = new Square(100, 'green');
    // Rendering SVG repesentation of the square
      const svg = square.render();
    // Assertions of the expect SVG attributes
      expect(svg).toContain('<rect');
      expect(svg).toContain('width="100"');
      expect(svg).toContain('height="100"');
      expect(svg).toContain('fill="green"');
    });