var gameCards = document.getElementById('gameCards')

gameCards.addEventListener('click', handleClick);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;

function handleClick(event) {
  if(event.target.className.indexOf('card-back') === -1) {
    return;
  }
  event.target.className += ' hidden';
  if(!firstCardClicked) {
    firstCardClicked = event.target
    firstCardClasses = firstCardClicked.previousElementSibling.className
  } else {
    secondCardClicked = event.target
    secondCardClasses = secondCardClicked.previousElementSibling.className
    if(firstCardClasses === secondCardClasses) {
      firstCardClicked = null;
      secondCardClicked = null;
      matches++
      displayStats();
      if(matches === maxMatches) {
        document.getElementById('modal').classList.remove('hidden');
      }
      attempts++
      displayStats();
      gameCards.addEventListener('click', handleClick);
    } else {
      gameCards.removeEventListener('click', handleClick);
      setTimeout(function(){
      firstCardClicked.classList.remove('hidden');
      firstCardClicked = null;
      secondCardClicked.classList.remove('hidden');
      secondCardClicked = null;
      gameCards.addEventListener('click', handleClick);
      }, 1500);
      attempts++
      displayStats();
    }
  }
}

function displayStats() {
  document.getElementById('games-played').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('accuracy').textContent = matches / attempts;
  document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
  if(!attempts){
    return "0%";
  }
  var value = (matches / attempts)
  var battingAverage = value.toFixed(3);
  var formattedAverage = battingAverage.substring(1);
  return formattedAverage
}

document.getElementById('reset-game').addEventListener('click', resetGame);

function resetGame() {
  resetCards();
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  destroyCards();
  shuffleCards();
  newCards();
}

function resetCards() {
  var hiddenCards = document.querySelectorAll('.hidden')
    for(var i = 0; i < hiddenCards.length; i++) {
      hiddenCards[i].classList.remove('hidden');
    }
    document.getElementById('modal').classList.add('hidden');
}

function shuffleCards() {
    for(var i = 0; i < allCards.length; i++) {
      var randomPosition = Math.floor(Math.random() * allCards.length);
      var placeHolder = allCards[i];
      allCards[i] = allCards[randomPosition];
      allCards[randomPosition] = placeHolder
    }
}

var allCards = ['astros-logo', 'brewers-logo', 'dodgers-logo', 'giants-logo', 'oakland-logo',
  'redsox-logo', 'rockies-logo', 'yankees-logo', 'astros-logo', 'brewers-logo', 'dodgers-logo',
  'giants-logo', 'oakland-logo', 'redsox-logo', 'rockies-logo', 'yankees-logo',
  'cubs-logo', 'cubs-logo'];

function newCards() {
  for(var i = 0; i < allCards.length; i++) {
    var gameCards = document.querySelector('#gameCards');
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('col-2');
    var cardFront = document.createElement('div');
    cardFront.classList.add('card-front')
    cardFront.classList.add(allCards[i]);
    var cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardDiv.append(cardFront);
    cardDiv.append(cardBack);
    gameCards.append(cardDiv);
  }
}

function destroyCards() {
  var mainElement = document.getElementById('gameCards');
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }
}

gameCards.onload = onLoadShuffle();
function onLoadShuffle() {
  destroyCards();
  shuffleCards();
  newCards();
}

// var icon = document.getElementById('icon');
// icon.addEventListener('click', volumeOn)

// function volumeOn(event) {
//   var thisIcon = document.getElementById('icon');
//   thisIcon.
// }
