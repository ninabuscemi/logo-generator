const { Circle, Triangle, Square } = require('./shapes');

test('should render a circle SVG', () => {
      const circle = new Circle(50, 'red');
      const svg = circle.render();
      expect(svg).toContain('<circle');
      expect(svg).toContain('cx="50"');
      expect(svg).toContain('cy="50"');
      expect(svg).toContain('r="50"');
      expect(svg).toContain('fill="red"');
    });

test('should render a triangle SVG', () => {
      const triangle = new Triangle('blue');
      const svg = triangle.render();
      expect(svg).toContain('<polygon');
      expect(svg).toContain('fill="blue"');
    });

test('should render a square SVG', () => {
      const square = new Square(100, 'green');
      const svg = square.render();
      expect(svg).toContain('<rect');
      expect(svg).toContain('width="100"');
      expect(svg).toContain('height="100"');
      expect(svg).toContain('fill="green"');
    });