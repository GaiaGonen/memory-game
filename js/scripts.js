//---------------------------------------------------
//
// Global Variables to use in the code
//
//---------------------------------------------------

const cards = document.querySelectorAll('.card');

const timer = document.getElementById('timer');

const cardValue = document.querySelectorAll('.card span');

const moveCounter = document.getElementById('num-of-moves');

let moves = 0;


// Values that need to be matched. cards.length should be equal to pairs.length
let pairs = ["red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue",
"red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue"];

shuffleArray(pairs);
// A loop to set the changeable values for the cards after each shuffle
for (let i=0; i < cardValue.length; i++) {
  cardValue[i].style.backgroundColor = pairs[i];
}

//---------------------------------------------------
//
// Functions
//
//---------------------------------------------------

// A function to start the timer running => TODO add a stop timer and implement it
// inside the start Timer.
function startTimer() {
  let secs = 0;
  let mins = 0;
  let hrs = 0;
  let displaySecs, displayMins, displayHrs;
  let counter = setInterval( function() {
    //conditions to make the seconds and minutes to count only to 59 and then add
    //a minute or an hour respectivley
    if (secs == 59) {
      secs = 0;
      if (mins == 59) {
        mins = 0;
        hrs++;
      } else {
        mins ++;
      }
    } else {
      secs++;
    }
    //conditions to set the display to be 00:00:00 and not 0:0:0
    if (secs < 10) {
      displaySecs = '0' + secs;
    } else {
      displaySecs = secs;
    }
    if (mins < 10) {
      displayMins = '0' + mins;
    } else {
      displayMins = mins;
    }
    if (hrs < 10) {
      displayHrs = '0' + hrs;
    } else {
      displayHrs = hrs;
    }
    timer.innerHTML = displayHrs + ':' + displayMins + ':' + displaySecs;
  }, 1000);
}

// A function to randomize an array (changes the original array)
// Implementaition of  Durstenfeld shuffle in EMACS6
// Is introduced by Laurens Holst in Stack-over-flow
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addMove() {
    moves++;
    moveCounter.innerHTML = moves;
}

function toggleCardClass(card) {
    card.classList.toggle('back');
    card.classList.toggle('front');
}

function checkCards() {
  let fronts = document.querySelectorAll('.front');
  if (fronts.length >= 2) {
    const compareValue1 = fronts[0].firstChild.style.getPropertyValue('background-color');
    const compareValue2 = fronts[1].firstChild.style.getPropertyValue('background-color');
    if (compareValue1 != compareValue2) {
      toggleCardClass(fronts[0]);
      toggleCardClass(fronts[1]);
    } else {
      fronts[0].removeEventListener('click', flipCard);
      fronts[1].removeEventListener('click', flipCard);
      fronts[0].style.visibility = 'hidden';
      fronts[1].style.visibility = 'hidden';
      toggleCardClass(fronts[0]);
      toggleCardClass(fronts[1]);
    }
  }
}

function flipCard() {
  toggleCardClass(this);
  checkCards();
  addMove();
}

function startGame() {
  // shuffle the deck

  // set deck values to cards

  // set click events to all cards

  // start startTimer

  // start counting moves
  let moves = 0;
}

function restartGame() {
  // shuffle the deck

  // set deck values to cards

  // I think click events will stay active?

  // restart startTimer


}

//---------------------------------------------------
//
// Game Functionality
//
//---------------------------------------------------

// TODO game functionality should begin only when pressing 'start game' or 'restart'.
// consider changing the button's value instead of doing two buttons.
// The timer should also reset. HOW to make the functionality

// A loop to add an event listner (click) on each card
for (let card of cards) {
  card.addEventListener('click', flipCard);
}
