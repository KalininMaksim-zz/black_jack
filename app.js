const deck = [6, 7, 8, 9, 10, 2, 3, 4, 11,
              6, 7, 8, 9, 10, 2, 3, 4, 11,
              6, 7, 8, 9, 10, 2, 3, 4, 11,
              6, 7, 8, 9, 10, 2, 3, 4, 11];

let handPlayer = [];
let handDealer = [];
let myDeck = [];

function startGame() {
  newDeck();
  resetResult();
  takeCard();
}

function newDeck() {

  if (myDeck.length !== 0) {
    myDeck = [...myDeck, ...handDealer, ...handPlayer];
    myDeck.sort(()=> .5 - Math.random());
  } else {
    myDeck = deck.sort(()=> .5 - Math.random());
  }
}

function resetResult() {
  handPlayer = [];
  handDealer = [];

  document.querySelector('.result').innerHTML = 'Let&#39;s play, a piece of meat?';
  document.querySelector('.all-point-dealer').innerHTML = 'dealer points: ';
  document.querySelector('.all-point-player').innerHTML = 'player points: ';

  document.querySelector('.control-btn').style.display = 'inline';
}

function getHandSum(hand) { //сумма номинала в руке
  let sum = 0;

  for (let i = 0; hand.length > i; i++) {
    sum += hand[i];
  };

  return sum;
}

function takeCard() { // взять еще и перебор (игрок и дилер)
  handPlayer.push(myDeck.pop());

  document.querySelector('.player-carts').innerHTML = 'player cards: ' + handPlayer;
  document.querySelector('.all-point-player').innerHTML = 'player points: ' + getHandSum(handPlayer);

  if (getHandSum(handDealer) <= 15) {
    takeDealer();

    return;
  }

  if (getHandSum(handPlayer) == 21) {
    document.querySelector('.result').innerHTML = ' You Win!!! ';
    showResult();

    return;
  }

  if (getHandSum(handPlayer) > 21) {
    document.querySelector('.result').innerHTML = ' You Bust!!! ';
    showResult();

    return;
  }
}

function takeDealer() {
  handDealer.push(myDeck.pop());
  document.querySelector('.dealer-carts').innerHTML = 'dealer cards: ' + handDealer[0];

  if (getHandSum(handDealer) > 21) {
    document.querySelector('.result').innerHTML = ' Bust dealer!!! Dammit! ';
    showResult();

    return;
  }
}

function showResult() {
  document.querySelector('.all-point-dealer').innerHTML = 'dealer points: ' + getHandSum(handDealer);
  document.querySelector('.dealer-carts').innerHTML = 'dealer cards: ' + handDealer;
  document.querySelector('.control-btn').style.display = 'none';
}

function compareCard() {
  showResult();

  if (getHandSum(handPlayer) == getHandSum(handDealer)) {
    document.querySelector('.result').innerHTML = ' Nobody ';

    return;
  }

  if (getHandSum(handPlayer) == 21 || getHandSum(handPlayer) > getHandSum(handDealer)) {
    document.querySelector('.result').innerHTML = ' You Win!!! ';

    return;
  }

  if (getHandSum(handPlayer) < 21 || getHandSum(handDealer) > getHandSum(handPlayer)) {
    document.querySelector('.result').innerHTML = ' You lose, maybe<br>another time, darling :)) ';

    return;
  }
}