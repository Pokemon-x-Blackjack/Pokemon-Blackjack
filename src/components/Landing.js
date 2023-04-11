import React, { useEffect, useState } from 'react';
import CharacterSelector from './CharacterSelector';
import HowToPlay from './HowToPlay';
import pokeball from '../assets/pokeBallClosed.png'
import pokeballOpen from "../assets/pokeBallOpen.png";


const Landing = ({ setCurrentPage }) => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    setCurrentPage('');
  }, [])

  const handleButtonClick = () => {
    setButtonSelected(true);
  }

  const handleHowToPlayClick = () => {
    setShowHowToPlay(true);
  }

  const handleCloseHowToPlay = () => {
    setShowHowToPlay(false);
  }

  // Mouse hover states

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
// Pokeball hover

  const pokeballSrc = isHovered ? pokeballOpen : pokeball;
  return (
    <>
      {showHowToPlay && <HowToPlay closeHowToPlay={handleCloseHowToPlay} />}
      {buttonSelected ? (
        <CharacterSelector
          setButtonSelected={setButtonSelected}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <section className="landing">
          <div className="wrapper">
            <div className="text">
              <h1>POKEJACK</h1>
              <h3>POKEMON x BLACKJACK</h3>
            </div>
            <div className="pokeBallContain">
                <img
                  src={pokeballSrc}
                  alt="Pokeball"
            
                />
            </div>

            <div className="buttonContainer">
              <button 
                    onClick={handleButtonClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>START</button>
              <button onClick={handleHowToPlayClick}>HOW TO PLAY</button> {/* Add a button to show/hide the HowToPlay component */}
            </div>

          </div>
        </section>
      )}
    </>
  );
};

export default Landing;
