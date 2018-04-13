// Click event to toggle between back and front

const cards = document.querySelectorAll('.card');

for (let card of cards) {
  card.addEventListener('click', function (event) {
    this.classList.toggle('back');
    this.classList.toggle('front');
  })
}
