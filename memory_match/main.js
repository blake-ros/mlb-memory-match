var gameCards = document.getElementById('gameCards')

gameCards.addEventListener('click', handleClick);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var maxMatches = 9;
var matches = 0;

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
      if(matches === maxMatches) {
        document.getElementById('modal').classList.remove('hidden');
      }
      gameCards.addEventListener('click', handleClick);
      console.log(matches);
      console.log('the images match');
    } else {
      gameCards.removeEventListener('click', handleClick);
      setTimeout(function(){
      firstCardClicked.classList.remove('hidden');
      firstCardClicked = null;
      secondCardClicked.classList.remove('hidden');
      secondCardClicked = null;
      gameCards.addEventListener('click', handleClick);
      }, 1500);
      console.log('the images do not match');
    }
  }
}
