import React from "react";

const Result = (props) => {
   console.log(props.winner)
  
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <div className="modalTitle">        
          {props.winner === 'player' && <p>Player wins!</p> }
          {props.winner === 'dealer' && <p>Dealer wins!</p> }
          {props.winner === 'ties' &&  <p>It's a tie!</p>}
        </div>
        <button className="modalButton" >
          Back to Home
        </button>
        <button className="modalButton" >
          Choose Character
        </button>
        

      </div>
    </div>
  );
};

export default Result;
