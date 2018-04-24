//---------------------------------------------------
//
// Global Variables to use in the code
//
//---------------------------------------------------

// TODO can all of those be inserted only where they are really beeded?
const cards = document.querySelectorAll('.card');

const timer = document.getElementById('timer');

const cardValue = document.querySelectorAll('.card span');

const moveCounter = document.getElementById('num-of-moves');

const restartButton = document.getElementById('restart-game');

const startGameButton = document.getElementById('start-game');

const gameCounter = document.getElementById('num-of-games');

const starRating = document.getElementById('star-rating')

let moves = 0;

let games = 0;

let timerCounter = null;

//---------------------------------------------------
//
// Functions
//
//---------------------------------------------------

function startTimer() {
  stopTimer();
  let secs = 0;
  let mins = 0;
  let hrs = 0;
  let displaySecs = '0' + secs, displayMins = '0' + mins, displayHrs = '0' + hrs;
  timer.innerHTML = displayHrs + ':' + displayMins + ':' + displaySecs;
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
    timer.innerHTML = displayHrs + ':' + displayMins + ':' + displaySecs;
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

function shuffleDeck() {
  // Values that need to be matched. cards.length should be equal to pairs.length
  let pairs = ["red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue",
  "red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue"];

  shuffleArray(pairs);
  // A loop to set the changeable values for the cards after each shuffle
  for (let i=0; i < cardValue.length; i++) {
    cardValue[i].style.backgroundColor = pairs[i];
  }
}

function createCard() {
  // TODO make the cards built from scratch, appended to a semi document and only then
  // distrubited across the board.
  // this function should create the element and append it to a created-on-the-fly semi document
  // in shuffle deck the cards should be created in the loop - create card- add the value -
  // nicely done!
  // can also add a nice animation
}

function addMove() {
    moves++;
    moveCounter.innerHTML = moves;
    checkStars();
}

function addGame() {
  games++;
  gameCounter.innerHTML = games;
}

function checkStars() { //TODO make this code more efficient
  if (moves <= 45) {
    starRating.children[0].style.visibility = 'visible';
    starRating.children[1].style.visibility = 'visible';
    starRating.children[2].style.visibility = 'visible';
  } else if (moves > 45 && moves <= 60) {
    starRating.children[0].style.visibility = 'hidden';
  } else if (moves > 60 && moves <= 75) {
    starRating.children[1].style.visibility = 'hidden';
  } else if (moves > 75) {
    starRating.children[2].style.visibility = 'hidden';
  }
}

function flipCardBack(card) {
    card.classList.replace('front', 'back');
}

function flipCardFront(card) {
  let fronts = document.querySelectorAll('.front')
  if  (fronts.length < 2) {
    card.classList.replace('back', 'front');
  }
}

function showModal() {
  const stars = starRating.children.length;
  const modal = document.getElementById('win_game_modal');
  const starsSpan = document.querySelector('.stars_num');
  starsSpan.innerHTML = stars;
  modal.style.display = "block";
}

function rightAnswer() {
  this.classList.add('hidden');
  this.classList.remove('front', 'right');
  this.removeEventListener('animationend', rightAnswer);
  // checks if all cards are gone and if they are it shows the modal
  const hiddenCards = document.querySelectorAll('ol .hidden');
  if (hiddenCards.length == cards.length) {
    showModal();
  }
} //what happens to the cards when cards match

function wrongAnswer() {
  this.classList.remove('wrong');
  flipCardBack(this);
  removeEventListener('animationend', wrongAnswer);

} //what happens to the cards when cards don't match

function checkCards() {
  const openCards = document.querySelectorAll('.front');
  const card1 = openCards[0];
  const card2 = openCards[1];
  const compareValueCard1 = card1.firstChild.style.getPropertyValue('background-color');
  const compareValueCard2 = card2.firstChild.style.getPropertyValue('background-color');
  if (compareValueCard1 == compareValueCard2) {
    card1.addEventListener('animationend', rightAnswer);
    card2.addEventListener('animationend', rightAnswer);
    card1.classList.add('right');
    card2.classList.add('right');
    // TODO should run a check here if all cards are gone and if yes run a function 'SUCCESS!!!'
    // future Gaia: I chose this place because after the cards are all right this place is where
    // the next code will run.

  } else {
    card1.addEventListener('animationend', wrongAnswer);
    card2.addEventListener('animationend', wrongAnswer);
    card1.classList.add('wrong');
    card2.classList.add('wrong');
  }
}

// Everything that should happen when clicking a card
function cardClick() {
  if (this.classList.contains('back')) {
    flipCardFront(this);
  } else if (this.classList.contains('front')) {
    flipCardBack(this);
  }
  let openCards = document.querySelectorAll('.front');
  if (openCards.length == 2) {
    checkCards();
  }
  addMove();
}

// Everything that should happen when starting the game
function startGame() {
  shuffleDeck();
  addGame();
  startTimer();
  // set click events to all cards
  for (let card of cards) {
    card.addEventListener('click', cardClick);
  }
  startGameButton.classList.add('hidden');
  restartButton.classList.remove('hidden');
}

// Everything that should happen when restarting a game
function restartGame() {
  // Turn all cards back if there are any
  const openCards = document.querySelectorAll('.front');
  if (openCards.length > 0) {
    for (let card of openCards) {
      flipCardBack(card);
    }
  }
  //remove any hidden styles
  const hiddenCards = document.querySelectorAll('ol .hidden');
  if (hiddenCards.length > 0) {
    for (let card of hiddenCards) {
      card.classList.remove('hidden');
      card.classList.add('back');
    }
  }
  addGame();
  // shuffle the deck
  shuffleDeck();
  // restart moves
  moves = 0
  moveCounter.innerHTML = moves;
  checkStars();
  // restart startTimer
  stopTimer(timerCounter);
  startTimer();
}

function playAgain() {
  const modal = document.getElementById('win_game_modal');
  modal.style.display = "none";
  //remove any hidden styles
  const hiddenCards = document.querySelectorAll('ol .hidden');
  if (hiddenCards.length > 0) {
    for (let card of hiddenCards) {
      card.classList.remove('hidden');
      card.classList.add('back');
    }
  }
  addGame();
  // shuffle the deck
  shuffleDeck();
  // restart moves
  moves = 0
  moveCounter.innerHTML = moves;
  checkStars();
  // restart startTimer
  stopTimer(timerCounter);
  startTimer();
}

//TODO pause button?
