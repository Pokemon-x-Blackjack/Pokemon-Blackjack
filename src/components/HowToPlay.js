import React from 'react';
import '../sass/App.scss';
import cardBack from '../assets/card-back.png';

// Prop coming from Landing.js
const HowToPlay = ({ closeHowToPlay }) => {
  return (
    <div className="howToPlayOverlay">
      <div className="modal modalFlex">

        <section className="gameRules">
          <h3>GAME RULES</h3>
            <ul>
              <li>Each round starts with two cards for you and the dealer.</li>
              <li>Your objective is to get card value as close to 21 as you can. But Don't go over 21! Or you lose the round immediately (BUST).</li>
              <li>Choose to <em>hit</em> or <em>stand</em>, and the dealer will hit until reaching at least 17.</li>
              <li>If your total card value is closer to 21 than the dealer's, you win and evolve your Pokemon.</li>
              <li>Keep playing to evolve your Pokemon to higher levels and become the ultimate trainer!</li>
            </ul>
        </section>
      

        <div className="rightSideFlex">

          <div className="cardKeyFlex">
            <div className="img">
              <img src={cardBack} alt="" />
            </div>

            <section className="cardGamesText">
              <h3>CARD KEY</h3>
              <ul className="cardKeyUl">  
                <li>Player: Ace can be worth 11 or 1.</li>
                <li>Dealer: First Ace counts as 11 unless it busts the hand. Subsequent Aces count as 1.</li>
                <li>King, Queen, and Jack are worth 10 points each.</li>
                <li>All other cards take on their numerical value.</li> 
              </ul>
            </section>

          </div>

          <ul className='buttonGuide'>
            <li>
              <button className='hitBut'>HIT</button>
              <p>Draw a card</p>
            </li>
            <li>
              <button className='standBut'>STAND</button>
              <p>End your turn</p>
            </li>
          </ul>

        </div>

      </div>


      <button onClick={closeHowToPlay}>OK</button>
    </div>
  );
};

export default HowToPlay;

