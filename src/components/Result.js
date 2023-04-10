import React, { useState } from "react";
import Landing from "./Landing";
import CharacterSelector from "./CharacterSelector";

const Result = (props) => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setButtonSelected(true);
  };

  return (
    <>
      {!buttonSelected ? (
        <div className="modalContainer">
          <div className="modalContent">
            <div className="modalTitle">
              {props.winner === "player" && <p>You win!</p>}
              {props.winner === "dealer" && <p>Dealer wins!</p>}
              {props.winner === "ties" && <p>It's a tie!</p>}

              {props.winner === "player" && (
                <>
                  <div className="imgContain">
                    <img
                      src={props.playerEvoArray[2].frontGifUrl}
                      alt="Player Final Evolution Pokemon"
                    />
                  </div>
                </>
              )}

              {props.winner === "dealer" && (
                <>
                  <div className="imgContain">
                    <img
                      src={props.dealerEvoArray[2].frontGifUrl}
                      alt="Dealer Final Evolition Pokemon"
                    />
                  </div>
                </>
              )}
              <div className="btnContain">
                <button
                  onClick={() => handleButtonClick("home")}
                  className="modalButton"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => handleButtonClick("character")}
                  className="modalButton"
                >
                  Choose Character
                </button>
              </div>
            </div>
          </div>
        </div> 
      ) : selectedButton === "home" ? (
        <Landing />
      ) : selectedButton === "character" ? (
        <CharacterSelector />
      ) : null}
    </>
  );
};

export default Result;
