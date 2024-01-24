// taulukot
const cardContainer = document.querySelector(".cards");
const colours = ['indigo',  'chartreuse',  'coral',  'turquoise',  'maroon',  'orchid',  'black',  'salmon',  'slategray',  'crimson',  'azure',  'olive'];
// const emojis = ["💖", "🤷‍♀️", "🤞", "🎶", "🎉", "✨", "🎀", "🎨", "👓", "🏀", "🔨", "⌚"];
const coloursPairs = [...colours, ...colours];
const cardQuantity = coloursPairs.length;

// peli muuttujat
let revealedQuantity = 0;
let activeCard = null;
let waitingMoveEnd = false;

function buildCard(colour) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-item", colour);
    element.setAttribute("item-clicked", "false");

//kuuntelee, kun pelaaja klikkaa korttia. if-lauseessa käsitellään vuoron loppu eli kun kaksi korttia on käännetty ja tarkastettu
    element.addEventListener("click", () => {
        const clicked = element.getAttribute("item-clicked");

        if (waitingMoveEnd || clicked === "true" || element === activeCard) {
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
        const colourMatch = activeCard.getAttribute("data-item");

        if (colourMatch === colour) {
            element.setAttribute("item-clicked", "true");
            activeCard.setAttribute("item-clicked", "true");
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

    //puolen minuutin timer, joka myös kääntää kortit takaisin
        setTimeout(() => {
            element.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;
            waitingMoveEnd = false;
            activeCard = null;
        }, 500);
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