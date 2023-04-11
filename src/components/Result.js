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
          <div className="modal">
            <div className="modalTitle">
              {props.winner === "player" && <h3>You win!</h3>}
              {props.winner === "dealer" && <h3>Dealer wins!</h3>}
              {props.winner === "ties" && <h3>It's a tie!</h3>}

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
