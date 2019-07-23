/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Vairables Declaration
var scores, roundScore, activePlayer, gameOver, finalScore;

// Get both dice images
var diceImage0 = document.getElementById('dice-0');
var diceImage1 = document.getElementById('dice-1');

// Initialize the game
init();

// Click Listener for Roll Button
document.querySelector('.btn-roll').addEventListener('click', function() {
  // Check if game is not over
  if (!gameOver) {
    // Generate 2 random numbers
    var dice0 = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    // Show Both Dice Images
    diceImage0.style.display = 'block';
    diceImage1.style.display = 'block';

    // Change both dice images to random images
    diceImage0.src = 'img/dice-' + dice0 + '.png';
    diceImage1.src = 'img/dice-' + dice1 + '.png';

    // Check if any dice rolled a 1
    if (dice0 !== 1 && dice1 !== 1) {
      // Add the dice scores to round score
      roundScore += dice0 + dice1;

      // Display the round score for the active player
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next Player Turn
      nextPlayer();
    }
  }
});

// Click Listener for Hold Button
document.querySelector('.btn-hold').addEventListener('click', function() {
  // Check if game is not over
  if (!gameOver) {
    // Add round score to active player's total score
    scores[activePlayer] += roundScore;

    // Display the total score of active player
    document.getElementById('score-' + activePlayer).textContent =
      scores[activePlayer];

    // Get the final Score
    finalScore = Number(document.querySelector('.final-score').value) || 100;

    // Check if the active player's score is more than the final score
    if (scores[activePlayer] >= finalScore) {
      // Change the Player Name to Winner!
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      // Hide both dice images
      diceImage0.style.display = 'none';
      diceImage1.style.display = 'none';

      // Add the winner class to winner player panel
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');

      // Remove the active class from the winner player panel
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');

      // Game Over
      gameOver = true;
    } else {
      // Next Player Turn
      nextPlayer();
    }
  }
});

// Click Listener for New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

// Next Player Turn
function nextPlayer() {
  // Change the active player
  activePlayer = activePlayer ? 0 : 1;

  // Reset the round score
  roundScore = 0;

  // Reset the round scores on display
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Toggle the active class player panels
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Hide both dice images
  diceImage0.style.display = 'none';
  diceImage1.style.display = 'none';
}

// Initialize the game
function init() {
  // Set all the scores to zero
  scores = [0, 0];
  roundScore = 0;

  // Set active player to player 1
  activePlayer = 0;

  // Game is not over
  gameOver = false;

  // Hide both dice images
  diceImage0.style.display = 'none';
  diceImage1.style.display = 'none';

  // Reset the total scores on display
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  // Reset the current scores on display
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Reset the player names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  // Set Player 1 panel as active
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
