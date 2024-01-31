const cardContainer = document.querySelector(".cards");
// taulukot
const colours = ['indigo',  'chartreuse',  'coral',  'turquoise',  'blue',  'orchid',  'black',  'yellow',  'slategray',  'crimson',  'azure',  'olive'];
const coloursPairs = [...colours, ...colours];
const cardQuantity = coloursPairs.length;

// peli muuttujat
let visibility = 0;
let activeCard = null;
let waitingMoveEnd = false;

// ajastin
let startTime;
let timerInterval;
const timerElement = document.querySelector(".timer");

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerElement.textContent = `Kulunut aika: ${minutes}:${seconds.toString().padStart(2, '0')} minuuttia`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function buildCard(colour) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.setAttribute("data-item", colour);
    element.setAttribute("item-clicked", "false");

//pelitilan seuranta
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
        
//katsotaan, onko värit samat ja jos on, niin asetetaan arvot true ja jätetään käännetyt kortit mukaan laskuun näkyviksi eli visibility muuttujaan lisätään +2
        const colourMatch = activeCard.getAttribute("data-item");

        if (colourMatch === colour) {
            element.setAttribute("item-clicked", "true");
            activeCard.setAttribute("item-clicked", "true");
            waitingMoveEnd = false;
            activeCard = null;
            visibility += 2;

//voitto ilmoitus, jos käännettyjen korttien määrä on kaikkien korttien määrä
        if (visibility === cardQuantity) {
            alert("Onnittelut! Löysit kaikki parit.");
            stopTimer();
        }

        return;
    }
        waitingMoveEnd = true;

    //jos kortit eivät vastaa toisiaan, asetetaan waitingMoveEnd true ja käynnistetään puolen sekunnin timer, joka kääntää kortit takaisin ei-näkyväksi
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
}

startTimer();