import React from 'react';
import '../sass/App.scss';
import cardBack from '../assets/card-back.png';

const HowToPlay = ({ closeHowToPlay }) => {
  return (
    <div className="howToPlayOverlay">
      <div className="howToPlayModal">

        <div className="gameRules">
          <h3>GAME RULES</h3>
            <ul>
              <li>Each round starts with two cards for you and the dealer.</li>
              <li>Choose to hit or stand, and the dealer will hit until reaching at least 17.</li>
              <li>If your total card value is closer to 21 than the dealer's, you win and evolve your Pokemon.</li>
              <li>Keep playing to evolve your Pokemon to higher levels and become the ultimate trainer!</li>
            </ul>
        </div>
      
        <div className="cardGames">
          
          <div className="img">
            <img src={cardBack} alt="" />
          </div>

          <div className="cardGamesText">
            <h3>CARD KEY</h3>
            <ul>  
              <li>Ace can be worth 11 or 1.</li>
              <li>King, Queen, and Jack are worth 10 points each.</li>
              <li>All other cards take on their numerical value.</li> 
            </ul>
          </div>
        </div>
        
      </div>
      <button onClick={closeHowToPlay}>OK</button>
    </div>
  );
};

export default HowToPlay;

