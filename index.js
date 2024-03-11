const fs = require('fs');
const prompt = require('prompt-sync')();

function modifyLogo(text, textColor, shape, shapeColor) {
    // Read the SVG file
    let svgContent = fs.readFileSync('./Assets/circle.svg', 'utf-8');

    // Modify the SVG content based on user input
    svgContent = svgContent.replace(/<circle.*?\/>/, `<${shape} cx="150" cy="100" r="80" fill="${shapeColor}" />`);
    svgContent = svgContent.replace(/<text.*?>.*?<\/text>/, `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>`);

    // Write the modified SVG content back to the file
    fs.writeFileSync('logo.svg', svgContent);
    console.log("Modified logo.svg");
}

function main() {
    const text = prompt("Enter up to three characters for the logo text: ");
    const textColor = prompt("Enter the text color (keyword or hexadecimal): ");
    const shapeOptions = ['circle', 'triangle', 'square'];
    const shapeIndex = prompt(`Choose a shape (${shapeOptions.join(', ')}): `);
    const shape = shapeOptions[parseInt(shapeIndex)];
    const shapeColor = prompt("Enter the shape color (keyword or hexadecimal): ");

    modifyLogo(text, textColor, shape, shapeColor);
}

main();
