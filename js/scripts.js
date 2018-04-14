// Click event to toggle between back and front

const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function (event) {
    this.classList.toggle('back');
    this.classList.toggle('front');
  })
}


// Shuffle the deck

let pairs = ["red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue",
             "red", "purple", "green", "yellow", "orange", "pink", "deeppink", "lightblue"];

// A function to randomize ann array (changes the original array)
// Implementaition of  Durstenfeld shuffle in EMACS6
// Is introduced by Laurens Holst in Stack-over-flow
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(pairs);

const fronts = document.querySelectorAll('.card span');

for (let i=0; i < fronts.length; i++) {
  fronts[i].style.backgroundColor = pairs[i];
}



// TIMER

let secs = 00;
let mins = 00;
let hrs = 00;
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

const timer = document.getElementById('timer');
