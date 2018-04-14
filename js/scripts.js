// Click event to toggle between back and front

const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function (event) {
    this.classList.toggle('back');
    // this.classList.toggle('front');
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
