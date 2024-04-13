const fs = require('fs');
const prompt = require('prompt-sync')();

function generateShape(shape, color) {
    const size = 100;  // Size for better visibility
    shape = shape.toLowerCase();  // Normalize the shape input to lowercase
    switch (shape) {
        case 'circle':
            // Circle is centered at (150, 100) with a radius of size
            return `<circle cx="150" cy="100" r="${size}" fill="${color}" />`;
        case 'square':
            // Square is centered by adjusting x, y to start at 100, 50, with the total size being twice the "size"
            return `<rect x="100" y="50" width="${size * 2}" height="${size * 2}" fill="${color}" />`;
        case 'triangle':
            // Points adjusted to make the triangle visually centered
            return `<polygon points="150,10 250,190 50,190" fill="${color}" />`;
        default:
            throw new Error("Unsupported shape: " + shape);
    }
}

function modifyLogo(text, textColor, shape, shapeColor) {
    const fontSize = 40;  // Font size adjusted for fit
    let textY = 100;  // Default vertical center for circle and square
    if (shape.toLowerCase() === 'triangle') {
        textY = 140; // Adjusted to visually center in triangle
    }
    // Create SVG content based on user input
    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${generateShape(shape, shapeColor)}
            <text x="150" y="${textY}" font-size="${fontSize}" text-anchor="middle" fill="${textColor}" alignment-baseline="middle">${text}</text>
        </svg>`;

    // Write the SVG content to a file
    fs.writeFileSync('logo.svg', svgContent);
    console.log("Generated logo.svg");
}

function main() {
    const text = prompt("Enter up to three characters for the logo text: ");
    const textColor = prompt("Enter the text color (keyword or hexadecimal): ");
    const shapeOptions = ['circle', 'triangle', 'square'];
    const shape = prompt(`Choose a shape (${shapeOptions.join(', ')}): `);
    const shapeColor = prompt("Enter the shape color (keyword or hexadecimal): ");

    modifyLogo(text, textColor, shape, shapeColor);
}

main();
