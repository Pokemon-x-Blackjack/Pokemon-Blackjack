import React from 'react';
import '../sass/App.scss';

const HowToPlay = ({ closeHowToPlay }) => {
  return (
    <div className="howToPlayOverlay">
      <div className="howToPlayModal">
        <h2>GAME RULES</h2>
        <ul>
          
          <li>- The objective of the game is to get as close to 21 as possible without going over.</li>
          <li>- You will start with two cards, you can choose to hit for more cards or stand if you're satisfied with your hand.</li>
          <li>- The dealer will also be dealt two cards, but only one of them will be visible to you.</li>
          <li>- If your hand is closer to 21 than the dealer's, you win & your Pokemon evolves a level!</li>
          <li>- First Pokemon to evol TWICE WINS!</li>
        </ul>
        <h3>Controls</h3>
        <ul>
        <li>- Click the 'Start' button to start the game.</li>
          <li>- Choose your Pokemon and enter the game.</li>
          <li>Hit: Press the Hit button to request an additional card.</li>
          <li>Stand: Press the Stand button to end your turn.</li>
          <li>New Game: Press the New Game button to start a new game.</li>
        </ul>
        <h3>Card Value</h3>
        <ul>
          <li>Ace = 11 or 1</li>
          <li>King, Queen, Jack = 10</li>
          <li>All other cards take on their numerical value</li>
        </ul>
        <button onClick={closeHowToPlay}>OK</button>
      </div>
    </div>
  );
};

export default HowToPlay;

