/*
#Games rules:
- The game has 2 players, playing in rounds
- in each round, a player can roll dice as much as he wishes. Each result get added to his ROUND score
- But if a player rolls 1, all his round score get 0.After that its the next players turn.
- The player can choose to hold, that means his round score get added to his global score. after thet its the next player turn.
- The first player reach to global score 100, wins the game. 

*/


var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn--roll').addEventListener('click', function () {

    if (gamePlaying) {

        //1. generate random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2.display the result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        //3.update the round score if the rolled number was not 1

        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.getElementById('current--' + activePlayer).textContent = roundScore;

        } else {

            nextPlayer();
        }
    }

});

document.querySelector('.btn--hold').addEventListener('click', function () {

    if (gamePlaying) {

        // add current score to the global score
        scores[activePlayer] += roundScore;

        // update user interface
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        // check if a player have won or not

        if (scores[activePlayer] >= 100) {
            document.getElementById('name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }


});

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.querySelector('#score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.querySelector('#current--1').textContent = '0';

    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    document.querySelector('.dice').style.display = 'none';

}