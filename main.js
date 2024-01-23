const cardContainer = document.querySelector(".cards");
const colours = [];
for (let i = 0; i < 12; i++) {
    const randomColour = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colours.push(randomColour);
}
console.log(colours);

const coloursPairs = [...colours, ...colours];
console.log(coloursPairs);

const cardQuantity = coloursPairs.length;


// peli muuttujat
let revealedQuantity = 0;
let activeCard = null;
let waitingMoveEnd = false;


function buildCard(colour) {
    const element = document.createElement("div");
    
    element.classList.add("card");
    element.setAttribute("data-colour", colour);
   // element.setAttribute("data-clicked", "false");

    element.addEventListener("click", () => {
        if (waitingMoveEnd) {
        return;
    }
   
// pelaajan valitsema kortti muuttuu värilliseksi
        element.style.backgroundColor = colour;

// valitaan vain kaksi korttia, muut pysyvät kääntämättömänä
        if (!activeCard) {
            activeCard = element;
            return;
        }

        console.log(activeCard);
        
//katsotaan, onko värit samat ja jos on, niin jätetään käännetyt kortit mukaan laskuun
        const colourMatch = activeCard.getAttribute("data-colour");

        if (colourMatch === colour) {
            element.setAttribute("data-clicked", "true");
            activeCard.setAttribute("data-clicked", "true");
            waitingMoveEnd = false;
            activeCard = null;
            revealedQuantity += 2;
//voitto ilmoitus, jos käännettyjen korttien määrä on kaikkien korttien määrä
        if (revealedQuantity === cardQuantity) {
            alert("Sinä voitit!");
        }

        return;
    }

        waitingMoveEnd = true;

    //minuutin timer, joka myös kääntää kortit takaisin
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;
            waitingMoveEnd = false;
            activeCard = null;
        }, 1000);
    });
    
    return element;
    }

// korttien rakennus HTML:n ja CSS:n sijaan javascriptillä
for (let i = 0; i < cardQuantity; i++) {
    const randomInd = Math.floor(Math.random() * coloursPairs.length);
    const colour = coloursPairs[randomInd];
    const card = buildCard(colour);

coloursPairs.splice(randomInd, 1);
cardContainer.appendChild(card);

    console.log(colour);
}