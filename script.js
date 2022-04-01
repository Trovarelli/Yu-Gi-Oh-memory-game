const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let p2 = parseInt(document.getElementById("points2").textContent)
let player = 0
let player1 = document.getElementById('player1')
let player2 = document.getElementById('player2')
let modalBg = document.getElementById('modalbox')
let modal = document.getElementById('modal')
let winner
closeModal()

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    player ++
    return;
  }

  // second click
  secondCard = this;
  
  checkForMatch();
  if(player % 2 === 0){
    setTimeout(() => {
      player2.classList.remove('player')
      player1.classList.add('player')
    }, 700)
  } else {
    setTimeout(() => {
      player1.classList.remove('player')
      player2.classList.add('player')
    }, 700)
  }

}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  

  if(isMatch) {
    disableCards()
    let p1 = parseInt(document.getElementById("points1").textContent)
    let p2 = parseInt(document.getElementById("points2").textContent)
    
    if(player % 2 !== 0) {
      player--
      let aux = p1 + 5
      document.getElementById('points1').innerHTML = aux
    } else {
      player--
      let aux2 = p2 + 5
      document.getElementById('points2').innerHTML = aux2
    }

    if(p1 + p2 === 25) {
      setTimeout(() => {
        openModal()
      }, 1000)
      if(p1 === p2) winner = 'Empate clan, boa'
      else if(p1 > p2) winner = 'Parabéns, player 1 ganhou'
      else winner = 'Parabéns, player 2 ganhou'
    }
    
  } else {
    unflipCards()
  }
}

function closeModal() {
  modalBg.classList.remove('modalbox')
  modal.classList.remove('modal')
  modal.style.opacity = 0
  modal.style.position = 'absolute'
}

function openModal() {
  modalBg.classList.add('modalbox')
  modal.classList.add('modal')
  modal.style.opacity = 1
  modal.style.position = 'relative'
  document.getElementById('winner').innerHTML = winner
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}


function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));





