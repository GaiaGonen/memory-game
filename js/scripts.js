//---------------------------------------------------
//
// Global Variables to use in the code
//
//---------------------------------------------------

const CARDS = document.querySelectorAll('.card');

const TIMER = document.querySelector('.timer');

const CARD_VALUE = document.querySelectorAll('.front');

const MOVE_COUNTER = document.querySelector('.num-of-moves');

const RESTART_BUTTON = document.querySelector('.restart-game-button');

const START_GAME_BUTTON = document.querySelector('.start-game-button');

const GAME_COUNTER = document.querySelector('.num-of-games');

let moves = 0;

let games = 0;

let timerCounter = null;

// Declared as globals so you can pull the time easly in other functions
let secs = 0;
let mins = 0;
let hrs = 0;

//---------------------------------------------------
// General Functions
//---------------------------------------------------

function startTimer() {
  stopTimer();
  secs = 0;
  mins = 0;
  hrs = 0;
  let displaySecs = '0' + secs, displayMins = '0' + mins, displayHrs = '0' + hrs;
  TIMER.innerHTML = displayHrs + ':' + displayMins + ':' + displaySecs;
  timerCounter = setInterval( function() {
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
    TIMER.innerHTML = displayHrs + ':' + displayMins + ':' + displaySecs;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerCounter);
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

function getTimeString() {
  let returnTimeString = 'You played for ';
  if (hrs > 0 && mins > 0 && secs > 0) {
    returnTimeString += hrs + ' hours, ' + mins + ' mins and ' + secs + ' seconds.';
  } else if (hrs === 0 && mins > 0 && secs > 0) {
    returnTimeString += mins + ' minutes and ' + secs + ' seconds.';
  } else if (hrs === 0 && mins === 0 && secs > 0) {
    returnTimeString += secs + ' seconds.';
  } else if (hrs > 0 && mins === 0 && secs > 0) {
    returnTimeString += hrs + ' hours and ' + secs + ' seconds.';
  } else if (hrs > 0 && mins > 0 && secs === 0) {
    returnTimeString += hrs + ' hours and ' + mins + ' minutes.';
  } else if (hrs > 0 && mins === 0 && secs === 0) {
    returnTimeString += hrs + ' hours.';
  } else if (hrs === 0 && mins > 0 && secs > 0) {
    returnTimeString += mins + ' minutes and ' + secs + ' seconds.';
  } else if (hrs === 0 && mins > 0 && secs === 0) {
    returnTimeString += mins + ' minutes.';
  } else {
    returnTimeString = 'You did not play at all :/';
  }
  return returnTimeString;
}

function showModal() {
  const STARS = document.querySelectorAll('.star');
  const MODAL = document.querySelector('.win-game-modal');
  const STARS_SPAN = document.querySelector('.stars-num');
  const TIME_PLAYED = document.querySelector('.time-played');
  STARS_SPAN.innerHTML = 'You got ' + STARS.length + ' stars!';
  TIME_PLAYED.innerHTML = getTimeString();
  MODAL.style.display = "block";
}

//---------------------------------------------------
// Counter Functions
//---------------------------------------------------

function addMove() {
  moves++;
  MOVE_COUNTER.innerHTML = moves;
  checkStars();
}

function addGame() {
  games++;
  GAME_COUNTER.innerHTML = games;
}

function checkStars() {
  if (moves > 25 && moves <= 50) {
    document.querySelector('.first-star').classList.replace('star', 'hidden');
  } else if (moves > 60 && moves <= 75) {
    document.querySelector('.second-star').classList.replace('star', 'hidden');
  }
}

//---------------------------------------------------
// Card functionality
//---------------------------------------------------

function flipCard(card) {
  card.classList.toggle('flipped');
}

function checkCards() {
  const OPEN_CARDS = document.querySelectorAll('.flipped');
  if (OPEN_CARDS.length == 2) {
    const CARD1 = OPEN_CARDS[0];
    const CARD2 = OPEN_CARDS[1];
    // uncomment to activate background checking
    // const compareValueCard1 = card1.firstElementChild.style.getPropertyValue('background-color');
    // const compareValueCard2 = card2.firstElementChild.style.getPropertyValue('background-color');
    const VALUE_TO_COMPARE = document.querySelectorAll('.flipped i');
    const COMPARE_VALUE_CARD1 = VALUE_TO_COMPARE[0].getAttribute('class');
    const COMPARE_VALUE_CARD2 = VALUE_TO_COMPARE[1].getAttribute('class');
    if (COMPARE_VALUE_CARD1 == COMPARE_VALUE_CARD2) {
      CARD1.addEventListener('animationend', rightAnswer);
      CARD2.addEventListener('animationend', rightAnswer);

      setTimeout( function() {
        CARD1.classList.add('right');
        CARD2.classList.add('right');
      }, 1000);
    } else {

      CARD1.addEventListener('animationend', wrongAnswer);
      CARD2.addEventListener('animationend', wrongAnswer);
      setTimeout( function() {
        CARD1.classList.add('wrong');
        CARD2.classList.add('wrong');
      }, 1000);
    }
  }
}

// Everything that should happen when clicking a card
function cardClick() {
  let OPEN_CARDS = document.querySelectorAll('.flipped');
  // do something to the card only when it's not already flipped and less than 2
  // cards overall are flipped.
  if  (OPEN_CARDS.length < 2  && !(this.classList.contains("flipped"))) {
    flipCard(this);
    checkCards();
    addMove();
  }
}

function shuffleDeck() {
  // Values that need to be matched. cards.length should be equal to pairs.length
  // uncomment to apply background to shuffled decks
  // let pairs = ["red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue",
  // "red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue"];
  let symbols = [
    'fab fa-docker',
    'fas fa-dna',
    'fas fa-cubes',
    'fas fa-bug',
    'fas fa-battery-three-quarters',
    'fas fa-leaf',
    'fas fa-hand-holding-heart',
    'fas fa-dove',
    'fab fa-docker',
    'fas fa-dna',
    'fas fa-cubes',
    'fas fa-bug',
    'fas fa-battery-three-quarters',
    'fas fa-leaf',
    'fas fa-hand-holding-heart',
    'fas fa-dove'
  ];

  shuffleArray(symbols);
  // uncomment to apply background to shuffled decks
  // shuffleArray(pairs);
  // A loop to set the changeable values for the cards after each shuffle
  for (let i=0; i < CARD_VALUE.length; i++) {
    // uncomment to apply background to shuffled decks
    // cardValue[i].style.backgroundColor = pairs[i];
    let elementi = document.createElement("I");
    elementi.className = symbols[i];
    // make sure every card.front has only one child
    // code from https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    while (CARD_VALUE[i].firstChild) {
      CARD_VALUE[i].removeChild(CARD_VALUE[i].firstChild);
    }
    CARD_VALUE[i].appendChild(elementi);
  }
}

//---------------------------------------------------
// Animations
//---------------------------------------------------

// a function to happen when the animation for ' cards matching ' ends.
function rightAnswer() {
  this.classList.add('hidden');
  this.classList.remove('right', 'flipped');
  this.removeEventListener('animationend', rightAnswer);
  // checks if all cards are gone and if they are it shows the win modal as the game is won
  const HIDDEN_CARDS = document.querySelectorAll('.cards .hidden');
  if (HIDDEN_CARDS.length == CARDS.length) {
    stopTimer();
    showModal();
  }
} //what happens to the cards when cards match

function wrongAnswer() {
  this.classList.remove('wrong');
  removeEventListener('animationend', wrongAnswer);
  flipCard(this);
} //what happens to the cards when cards don't match

//---------------------------------------------------
// Functions to start a new game
//---------------------------------------------------

// Everything that should happen when starting the game
function startGame() {
  const MODAL = document.querySelector('.start-game-modal');
  MODAL.style.display = "none";
  restartGame();
  shuffleDeck();
  addGame();
  startTimer();
  // set click events to all cards
  for (let card of CARDS) {
    card.addEventListener('click', cardClick);
  }
  START_GAME_BUTTON.classList.add('hidden');
  RESTART_BUTTON.classList.remove('hidden');
}

// Everything that should happen when restarting a game
function restartGame() {
  // Turn all cards back if there are any
  const OPEN_CARDS = document.querySelectorAll('.flipped');
  if (OPEN_CARDS.length > 0) {
    for (let card of OPEN_CARDS) {
      flipCard(card);
    }
  }

  // show any hidden cards
  const HIDDEN_CARDS = document.querySelectorAll('.cards .hidden');
  if (HIDDEN_CARDS.length > 0) {
    for (let card of HIDDEN_CARDS) {
      card.classList.remove('hidden');
    }
  }

  // show any star hidden styles
  const HIDDEN_STARS = document.querySelectorAll('.star-rating .hidden');
  if (HIDDEN_STARS.length > 0) {
    for (let star of HIDDEN_STARS) {
      star.classList.add('star');
      star.classList.remove('hidden');
    }
  }

  addGame();

  // shuffle the deck
  shuffleDeck();

  // restart moves
  moves = 0;
  MOVE_COUNTER.innerHTML = moves;
  checkStars();
  // restart startTimer
  stopTimer(timerCounter);
  startTimer();
}

function playAgain() {
  const MODAL = document.querySelector('.win-game-modal');
  MODAL.style.display = "none";
  restartGame();
}
