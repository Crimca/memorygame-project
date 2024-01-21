// constants
const cardContainer = document.querySelector(".cards");
const colours = [];
for (let i = 0; i < 6; i++) {
    const randomColour = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colours.push(randomColour);
}
console.log(colours);

const coloursPairs = [...colours, ...colours];
console.log(coloursPairs);

const cardQuantity = coloursPairs.length;

