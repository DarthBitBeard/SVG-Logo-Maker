const fs = require('fs');
const prompt = require('prompt-sync')();

function generateShape(shape, color) {
    const size = 80; // Size factor for uniformity in visual appearance
    shape = shape.toLowerCase();  // Normalize the shape input to lowercase
    switch (shape) {
        case 'circle':
            return `<circle cx="150" cy="100" r="${size}" fill="${color}" />`;
        case 'square':
            return `<rect x="110" y="60" width="${size * 2}" height="${size * 2}" fill="${color}" />`;
        case 'triangle':
            return `<polygon points="150,20 230,180 70,180" fill="${color}" />`;
        default:
            throw new Error("Unsupported shape: " + shape); // This will clarify which shape is causing the issue
    }
}

function modifyLogo(text, textColor, shape, shapeColor) {
    // Create SVG content based on user input
    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${generateShape(shape, shapeColor)}
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
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
