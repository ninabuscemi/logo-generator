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
    constructor(color) {
        this.color = color;
    }

    draw(width, centerX, centerY) {
        const points = `${centerX},${centerY - width / 2} ${centerX - width / 2},${centerY + width / 2} ${centerX + width / 2},${centerY + width / 2}`;
        return `<polygon points="${points}" fill="${this.color}" />`;
    }
}

class Square {
    constructor(size, color) {
        this.size = size;
        this.color = color;
    }

    draw() {
        const centerX = 100;
        const centerY = 100;
        return `<rect x="${centerX - this.size / 2}" y="${centerY - this.size / 2}" width="${this.size}" height="${this.size}" fill="${this.color}" />`;
    }
}

module.exports = { Circle, Triangle, Square };