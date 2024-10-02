// VARIABLES
//----------
// DOM elements
const form = document.querySelector('form');
const instructions = document.querySelector('.instructions');
const activeSpot = document.querySelector('.active-spot');
const bench = document.querySelector('.bench');
const deck = document.querySelector('.deck');
const discardPile = document.querySelector('.discard-pile');
const resetPage = document.querySelector('#reload-page');
const toggleInstructions = document.querySelectorAll('#toggle-instructions')

// Global variables
const maxCards = 5;
const cards = [];
let currentActiveCard;
let currentBenchCardCount;

// EVENT LISTENERS
//----------------
// form submit action listener
form.onsubmit = function(e) {
    e.preventDefault();
    const pokemonInput = document.querySelector('#pokemon').value.toLowerCase();
    fetchPokemon(pokemonInput)
}
// deck event listener
deck.addEventListener('click', generateRandomPokemon)

resetPage.addEventListener('click', reloadPage)
function reloadPage(){
    location.reload()
}

const toggleInstructionVisibility = () => {
    if (instructions.style.display === "none") {
        instructions.style.display = "block"
    } else {
        instructions.style.display = "none"
    }
}

toggleInstructions.forEach(button => {
    button.addEventListener('click', toggleInstructionVisibility);
});

// bench event listener
bench.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (card) {
        moveCardToActiveSpot(card);
    }
    currentBenchCardCount = bench.childElementCount;
});

// FUNCTIONS
//----------
// Random pokemon id number for API call
function generateRandomPokemon() {
    let randomPokemon = Math.floor(Math.random()*1000);
    if (randomPokemon === 0) {randomPokemon = 1}
    fetchPokemon(randomPokemon);
}

// move card to active-spot when it's clicked
function moveCardToActiveSpot(card) {
    if (currentActiveCard) {
        activeSpot.removeChild(currentActiveCard);
        bench.append(currentActiveCard);
        bench.removeChild(card);
        activeSpot.appendChild(card);
        currentActiveCard = card;
        currentBenchCardCount = bench.childElementCount;
    } else {
        bench.removeChild(card);
        activeSpot.appendChild(card);
        currentActiveCard = card;
        currentBenchCardCount = bench.childElementCount;
        if (currentBenchCardCount < maxCards) {
            generateRandomPokemon()
        }
    }
}

// Allows dragging cards to different locations
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function onDragOver(event) {
    event.preventDefault();
}
function discard(event) {
    const cardName = event.dataTransfer.getData("text");
    const card = document.getElementById(cardName);
    card.classList.add('discarded');
    if (card.classList.contains('activeCard')){
        currentActiveCard = false;
        card.classList.remove('activeCard');
    }
    discardPile.append(card);
    currentBenchCardCount = bench.childElementCount;
    if (currentBenchCardCount < maxCards){
        generateRandomPokemon()
    }
}
function dropActiveSpot(event) {
    const cardName = event.dataTransfer.getData("text");
    const card = document.getElementById(cardName);
    card.classList.add('activeCard');
    moveCardToActiveSpot(card);
}

// pokemon object constructor
class Pokemon {
    constructor(name, artwork, move1, move2, ability, height, weight, id, type, stats) {
        this.name = name;
        this.artwork = artwork;
        this.move1 = move1;
        this.move2 = move2;
        this.ability = ability;
        this.height = height;
        this.weight = weight;
        this.id = id;
        this.type = type;
        this.stats = stats;
    }
}

class PokemonMove {
    constructor(name, accuracy, damageClass, effectChance, power, pp, flavorText, critRate, healing) {
        this.name = name;
        this.accuracy = accuracy;
        this.damageClass = damageClass;
        this.effectChance = effectChance;
        this.power = power;
        this.pp = pp;
        this.flavor_text = flavorText;
        this.crit_rate = critRate;
        this.healing = healing
    }
}