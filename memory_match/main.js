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
      console.log('attempts:', attempts);
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
      console.log('attempts:', attempts)
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
  var value = (matches / attempts) * 100;
  return Math.trunc(value) + "%";
}
