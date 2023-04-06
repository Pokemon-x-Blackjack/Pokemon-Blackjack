import { useEffect, useState } from 'react';

import cardBack from '../assets/card-back.png';

// TO DO: destructing props
const Player = (props) => {
    
    const playerCardsProp =  props.playerCards
    const currentEvolution = props.evolutionArr[props.playerEvolution];


   
    return (
        <section className="playerSection">
            <ul className='playerCardList'>Player's cards
                {
                    playerCardsProp.map((card) => {
                        return (
                            <li key={card.code} className="cardContainer">
                                <div className="innerCard">
                                    <figure className='card cardBack'><img src={cardBack} alt="back of poker card" /></figure>
                                    <figure className='card cardFront'><img src={card.image} alt={card.value + card.suit} /></figure>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            
            <div>
                <img src={currentEvolution.frontGifUrl} alt={currentEvolution.altFront} />
                <h3>{currentEvolution.name}</h3>
            </div>

            <p>player's card value: {props.cardValue}</p>

            {
                props.standMode || props.bustStatus
                ? null
                : ( <>
                        <button onClick={props.handleStand}>STAND</button>
                        <button onClick={props.handleHit}>HIT</button>
                    </>
                )
            }

            {
                props.bustStatus
                ? <p className="bust">BUST</p>
                : null
            }
            
        </section>
    )
}

export default Player;