//---------------------------------------------------
//
// Global Variables to use in the code
//
//---------------------------------------------------

// TODO can all of those be inserted only where they are really beeded?
const cards = document.querySelectorAll('.card'); // CHANGE

const timer = document.getElementById('timer');

const cardValue = document.querySelectorAll('.card span'); // CHANGE

const moveCounter = document.getElementById('num-of-moves');

const restartButton = document.getElementById('restart-game');

const startGameButton = document.getElementById('start-game');

const gameCounter = document.getElementById('num-of-games');

const starRating = document.getElementById('star-rating')

let moves = 0;

let games = 0;

let timerCounter = null;

//---------------------------------------------------
// General Functions
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

function showModal() {
  const stars = document.querySelectorAll('.star');
  const modal = document.getElementById('win_game_modal');
  const starsSpan = document.querySelector('.stars_num');
  starsSpan.innerHTML = stars.length;
  modal.style.display = "block";
}

//---------------------------------------------------
// Counter Functions
//---------------------------------------------------

function addMove() {
  moves++;
  moveCounter.innerHTML = moves;
  checkStars();
}

function addGame() {
  games++;
  gameCounter.innerHTML = games;
}

function checkStars() {
  const stars = document.querySelectorAll('.star')
  if (moves > 25 && moves <= 50) {
    document.getElementById('first-star').classList.replace('star', 'hidden');
  } else if (moves > 60 && moves <= 75) {
    document.getElementById('second-star').classList.replace('star', 'hidden');
  } else if (moves > 75) {
    document.getElementById('third-star').classList.replace('star', 'hidden');
  }
}

//---------------------------------------------------
// Card functionality
//---------------------------------------------------

function createCard() {
  // TODO make the cards built from scratch, appended to a semi document and only then
  // distrubited across the board.
  // this function should create the element and append it to a created-on-the-fly semi document
  // in shuffle deck the cards should be created in the loop - create card- add the value -
  // nicely done!
  // can also add a nice animation
}

function flipCardBack(card) { // CHANGE should instead of replacing classes hide the front figure
  card.classList.replace('front', 'back');
}

function flipCardFront(card) { // CHANGE should instead of replacing classes hide the back figure
  let fronts = document.querySelectorAll('.front') // CHANGE should consider how to mark open cards.
  if  (fronts.length < 2) {
    card.classList.replace('back', 'front');
  }
}

function checkCards() {
  const openCards = document.querySelectorAll('.front'); // CHANGE should consider how to mark open cards.
  const card1 = openCards[0];
  const card2 = openCards[1];
  const compareValueCard1 = card1.firstChild.style.getPropertyValue('background-color'); // Check if firstChild is still true
  const compareValueCard2 = card2.firstChild.style.getPropertyValue('background-color');
  if (compareValueCard1 == compareValueCard2) {
    card1.addEventListener('animationend', rightAnswer);
    card2.addEventListener('animationend', rightAnswer);
    card1.classList.add('right');
    card2.classList.add('right');
  } else {
    card1.addEventListener('animationend', wrongAnswer);
    card2.addEventListener('animationend', wrongAnswer);
    card1.classList.add('wrong');
    card2.classList.add('wrong');
  }
}

// Everything that should happen when clicking a card
function cardClick() { // May CHANGE dependeing of DOM tree new structure
  if (this.classList.contains('back')) {
    flipCardFront(this);
  } else if (this.classList.contains('front')) {
    flipCardBack(this);
  }
  let openCards = document.querySelectorAll('.front'); // CHANGE
  if (openCards.length == 2) {
    checkCards();
  }
  addMove();
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

//---------------------------------------------------
// Animations
//---------------------------------------------------

function rightAnswer() {
  this.classList.add('hidden');
  this.classList.remove('front', 'right'); // CHANGE - may not need to include anything instead of right
  this.removeEventListener('animationend', rightAnswer);
  // checks if all cards are gone and if they are it shows the modal
  const hiddenCards = document.querySelectorAll('.cards .hidden');
  if (hiddenCards.length == cards.length) {
    showModal();
  }
} //what happens to the cards when cards match

function wrongAnswer() {
  this.classList.remove('wrong');
  flipCardBack(this); // may CHANGE
  removeEventListener('animationend', wrongAnswer);
} //what happens to the cards when cards don't match

//---------------------------------------------------
// Functions to start a new game
//---------------------------------------------------

// Everything that should happen when starting the game
function startGame() {
  shuffleDeck();
  addGame();
  startTimer();
  // set click events to all cards
  for (let card of cards) { // may CHANGE - check on which element this needs to execute on
    card.addEventListener('click', cardClick);
  }
  startGameButton.classList.add('hidden');
  restartButton.classList.remove('hidden');
}

// Everything that should happen when restarting a game
function restartGame() {
  // Turn all cards back if there are any
  const openCards = document.querySelectorAll('.front'); // CHANGE
  if (openCards.length > 0) {
    for (let card of openCards) {
      flipCardBack(card); // may CHANGE
    }
  }
  //remove any relevant hidden styles
  const hiddenCards = document.querySelectorAll('.cards .hidden');
  if (hiddenCards.length > 0) {
    for (let card of hiddenCards) {
      card.classList.add('back'); // may CHANGE
      card.classList.remove('hidden');
    }
  }

  //remove any relevant hidden styles
  const hiddenStars = document.querySelectorAll('#star-rating .hidden');
  if (hiddenStars.length > 0) {
    for (let star of hiddenStars) {
      star.classList.add('star');
      star.classList.remove('hidden');
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
  restartGame();
}

//TODO pause button?
