let userScore = 0;
let compScore = 0;
let drawScore = 0;

let movesLeft = 10;


const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.getElementById('result');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
const actionMsg_div = document.getElementById('action-msg');
const movesLeft_span = document.getElementById('moves-left');

const gameInit_div = document.getElementById('init-game');
const newGame_div = document.getElementById('new-game');
const gameOver_div = document.getElementById('game-over');
const playAgain_btn = document.getElementById('play-again');
const gameResult_div = document.getElementById('game-result');
const gameResult_icon = document.getElementById('result-icon');;

const getComputerChoice = () => {
  const choices = ['r', 'p', 's'];
  const randIndex = Math.floor(Math.random() * 3);
  return choices[randIndex];
}

const showMessage = (msg) => {
  result_div.innerHTML = msg;
}

const convertToWord = (choice) => {
  if (choice === 'r') return 'Rock';
  if (choice === 'p') return 'Paper';
  if (choice === 's') return 'Scissors';
  return 'aoer8n';
}

const win = (user, computer) => {
  userScore++;
  userScore_span.innerHTML = userScore;
  const msg = `${convertToWord(user)} beats ${convertToWord(computer)}! You Win!`;
  showMessage(msg);

  document.getElementById(user).classList.add('win');
  setTimeout(() => document.getElementById(user).classList.remove('win'), 300);
}

const lose = (user, computer) => {
  compScore++;
  compScore_span.innerHTML = compScore;
  const msg = `${convertToWord(user)} loses to ${convertToWord(computer)}! You Lose!`;
  showMessage(msg);

  document.getElementById(user).classList.add('lose');
  setTimeout(() => document.getElementById(user).classList.remove('lose'), 300);
}

const draw = (user, computer) => {
  msg = `${convertToWord(user)} and ${convertToWord(computer)}! It's a Draw! `;
  showMessage(msg);

  document.getElementById(user).classList.add('draw');
  setTimeout(() => document.getElementById(user).classList.remove('draw'), 300);
}


const game = (userChoice) => {
  const computerChoice = getComputerChoice();

  if (movesLeft-1 > 0) {
    movesLeft--;
    actionMsg_div.innerHTML = `Moves Left: ${movesLeft}`;

    // Game logic
    switch (userChoice + computerChoice) {
      case 'rs':
      case 'sp':
      case 'pr':
      win(userChoice, computerChoice);
      break;

      case 'rp':
      case 'ps':
      case 'sr':
      lose(userChoice, computerChoice);
      break;

      case 'rr':
      case 'pp':
      case 'ss':
      draw(userChoice, computerChoice);
      break;
    }
  } else {
    actionMsg_div.innerHTML = 'Game Over!';
    // Check if Game is over
    gameInit_div.classList.remove('hidden');
    gameOver_div.classList.remove('hidden');
    overGame();
  }
}

initiateGame = () => {
  userScore = 0;
  compScore = 0;
  drawScore = 0;
  movesLeft = 5;

  newGame_div.classList.remove('hidden');
  gameOver_div.classList.add('hidden');
  actionMsg_div.innerHTML = `Moves Left: ${movesLeft}`;

  userScore_span.innerHTML = 0;
  compScore_span.innerHTML = 0;

  let moveIndex = 0;
  const moveButtons = document.querySelectorAll('.move');
  moveButtons.forEach((move, idx) => {
    move.addEventListener('click', () => {
      movesLeft = move.innerHTML;
      move.classList.add('move-selected');
      actionMsg_div.innerHTML = `Moves Left: ${movesLeft}`;

      if (moveIndex !== idx) {
        moveButtons[moveIndex].classList.remove('move-selected');
        moveIndex = idx;
      }
    })
  });

  document.getElementById('start-game').addEventListener('click', () => {
    gameInit_div.classList.add('hidden');
    newGame_div.classList.add('hidden');
  })
}

overGame = () => {
  if (userScore > compScore) {
    gameResult_div.innerHTML = `You beat computer by ${userScore} : ${compScore}`;
    gameOver_div.classList.add('game-won');
    gameResult_icon.classList.remove('fa-thumbs-down', 'fa-hand-shake').add('fa-thumbs-up');
  } else if (userScore > compScore) {
    gameResult_div.innerHTML = `You beat computer by ${userScore} : ${compScore}`;
    gameOver_div.classList.add('game-lost');
    gameResult_icon.classList.remove('fa-thumbs-up', 'fa-hand-shake').add('fa-thumbs-down');
  } else {
    gameResult_div.innerHTML = `Game draw by ${userScore} : ${compScore}`;
    gameResult_icon.classList.remove('fa-thumbs-up', 'fa-thumbs-up').add('fa-handshake');
  }
}

const main = () => {

  initiateGame();
  rock_div.addEventListener('click', () => game('r'));
  paper_div.addEventListener('click', () => game('p'));
  scissors_div.addEventListener('click', () => game('s'));

  playAgain_btn.addEventListener('click', () => {
    initiateGame();
    gameOver_div.classList.remove('game-won', 'game-lost');
  });

}

// Call the entry function
main();
