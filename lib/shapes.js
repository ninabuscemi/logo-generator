// shapes.js

class Circle {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }

    draw() {
        return `<circle cx="${this.radius}" cy="${this.radius}" r="${this.radius}" fill="${this.color}" />`;
    }
}

class Triangle {
    constructor(height, color) {
        this.height = height;
        this.color = color;
    }

    draw() {
        const centerX = 150;
        const centerY = 100;
        const points = `${centerX},${centerY - this.height / 2} ${centerX - 50},${centerY + this.height / 2} ${centerX + 50},${centerY + this.height / 2}`;
        return `<polygon points="${points}" fill="${this.color}" />`;
    }
}

class Square {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }

    draw() {
        const centerX = 150;
        const centerY = 100;
        return `<rect x="${centerX - this.size / 2}" y="${centerY - this.size / 2}" width="${this.size}" height="${this.size}" fill="${this.color}" />`;
    }
}

module.exports = { Circle, Triangle, Square };