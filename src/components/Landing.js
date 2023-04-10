import React, { useState } from 'react';
import CharacterSelector from './CharacterSelector';
import HowToPlay from './HowToPlay';
import snorlax from '../assets/snorlax-pokemon.gif'


const Landing = () => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handleButtonClick = () => {
    setButtonSelected(true);
  }

  const handleHowToPlayClick = () => {
    setShowHowToPlay(true);
  }

  const handleCloseHowToPlay = () => {
    setShowHowToPlay(false);
  }

  return (
    <>
      {showHowToPlay && <HowToPlay closeHowToPlay={handleCloseHowToPlay} />}
      {buttonSelected ? (
        <CharacterSelector
          setButtonSelected={setButtonSelected}
        />
      ) : (
        <section className="landing">
          <div className="wrapper">
            <div className="text">

              <h1>POKEMON x BLACKJACK</h1>
            </div>
            {/* {/* <div className="imgContainer">
              <img src={snorlax} alt='Gif of Snorlax waving' />  */}
            <div className="buttonContainer">
              <button onClick={handleButtonClick}>START</button>
              <button onClick={handleHowToPlayClick}>HOW TO PLAY</button> {/* Add a button to show/hide the HowToPlay component */}
            </div>
           
          </div>
        </section>
      )}
    </>
  );
};

export default Landing;
