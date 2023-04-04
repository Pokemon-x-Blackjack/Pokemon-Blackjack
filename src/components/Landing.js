import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import characterSelector from './CharacterSelector';

const Landing = () => {

   const [buttonSelected, setButtonSelected] =  useState(false);
    
    const handleButtonClick = () => {
        setButtonSelected(true);
        
    }

    return (
        <main className='landing'>
          <div className="wrapper">
            {/* ADD NAV */}
            <div className="text">
              <h1>POKÉJACK</h1>
              <h3>Pokemon x Blackjack</h3>
            </div>
            <h3>img here</h3>
            <div className='buttonContainer'>
              {buttonSelected ? (
                <CharacterSelector />
              ) : (
                <button onClick={handleButtonClick}>START</button>
              )}
            </div>
            {/* Add Link to characterSelect once component is created */}
            {/* ADD FOOTER */}
          </div>
        </main>
      );
      
};

export default Landing;