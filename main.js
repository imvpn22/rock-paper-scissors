let userScore = 0;
let compScore = 0;

const userScore_span = document.getElementById('user-score');
const compScore_span = document.getElementById('comp-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.getElementById('result');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');


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
  const msg = convertToWord(user) + ' beats ' + convertToWord(computer) + ' ! You WON';
  showMessage(msg);
}

const lose = (user, computer) => {
  compScore++;
  compScore_span.innerHTML = compScore;
  const msg = convertToWord(user) + ' lost ' + convertToWord(computer) + ' ! You LOSE';
  showMessage(msg);
}

const draw = (user, computer) => {
  msg = convertToWord(user) + ' and ' + convertToWord(computer) + ' ! Its DRAW!'
  showMessage(msg);
}


const game = (userChoice) => {
  const computerChoice = getComputerChoice();

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

}

const main = () => {
  rock_div.addEventListener('click', () => {
    game('r');
  });

  paper_div.addEventListener('click', () => {
    game('p');
  });

  scissors_div.addEventListener('click', () => {
    game('s');
  });
}

main();


