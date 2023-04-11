import React, { useEffect, useState } from 'react';
import CharacterSelector from './CharacterSelector';
import HowToPlay from './HowToPlay';
import pokeball from '../assets/pokeBallClosed.png'
import pokeballOpen from "../assets/pokeBallOpen.png";


const Landing = ({ setCurrentPage }) => {
  // *********** USESTATES ***************

  const [buttonSelected, setButtonSelected] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const [isHovered, setIsHovered] = useState(false);


  // *********** FUNCTIONS: EVENT HANDLERS ***************
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


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // useEffect(() => {
  //   setCurrentPage('');
  // }, [])


  // Pokeball hover

  const pokeballSrc = isHovered ? pokeballOpen : pokeball;

  return (
    <>
      {/* how to play modal */}

      {showHowToPlay && <HowToPlay closeHowToPlay={handleCloseHowToPlay} />}

      {/* render characterSelector */}

      {buttonSelected ? (
        <CharacterSelector
          setButtonSelected={setButtonSelected}
        // setCurrentPage={setCurrentPage}
        />
      ) : (
        // landing page

        <section className="landing">
          {/* wrapper */}
          <div className="wrapper">

            {/* title */}
            <div className="text">
              <h1>POKEJACK</h1>
              <h2>POKEMON x BLACKJACK</h2>
            </div>

            {/* title img */}
            <div className="pokeBallContain">
              <img
                src={pokeballSrc}
                alt="Pokeball"
              />
            </div>

            {/* buttons */}
            <div className="buttonContainer">

              {/* start btn */}
              <button
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                START
              </button>

              {/* How to play btn */}
              <button onClick={handleHowToPlayClick}>HOW TO PLAY</button>
            </div>

          </div>
        </section>
      )}
    </>
  );
};

export default Landing;
