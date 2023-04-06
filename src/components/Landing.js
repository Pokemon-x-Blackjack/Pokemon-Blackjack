import React, { useState } from 'react';
import CharacterSelector from './CharacterSelector';
import HowToPlay from './HowToPlay';


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
        <CharacterSelector />
      ) : (
        <section className="landing">
          <div className="wrapper">
            {/* ADD NAV */}
            <div className="text">
              <h1>POKÉJACK</h1>
              <h3>Pokemon x Blackjack</h3>
            </div>
            <h3>img here</h3>
            <div className="buttonContainer">
              <button onClick={handleButtonClick}>START</button>
              <button onClick={handleHowToPlayClick}>HOW TO PLAY</button> {/* Add a button to show/hide the HowToPlay component */}
            </div>
            {/* Add Link to characterSelect once component is created */}
            {/* ADD FOOTER */}
          </div>
        </section>
      )};
    </>
  );
};

export default Landing;
