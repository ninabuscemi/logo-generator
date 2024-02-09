// Parent Shape class
class Shape {
    constructor(color) {
        this.color = color;
    }

    setColor(color) {
        this.color = color;
    }

    // Abstracted render method
    render() {
        throw new Error('Method not implemented');
    }
}

// Circle class
class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }

    // Implemented render method for Circle
    render() {
        return `<circle cx="${this.radius}" cy="${this.radius}" r="${this.radius}" fill="${this.color}" />`;
    }
}

// Triangle class
class Triangle extends Shape {
    constructor(color) {
        super(color);
    }

    // Implemented render method for Triangle
    render() {
        const points = "150,18 244,182 56,182"; // Example points for equilateral triangle
        return `<polygon points="${points}" fill="${this.color}" />`;
    }
}

// Square class
class Square extends Shape {
    constructor(size, color) {
        super(color);
        this.size = size;
    }

    // Implemented render method for Square
    render() {
        const centerX = 100;
        const centerY = 100;
        return `<rect x="${centerX - this.size / 2}" y="${centerY - this.size / 2}" width="${this.size}" height="${this.size}" fill="${this.color}" />`;
    }
}

module.exports = { Shape, Circle, Triangle, Square };