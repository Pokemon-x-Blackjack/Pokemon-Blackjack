// Game.js
import { useEffect, useState } from 'react';
import axios from 'axios';

import Player from './Player.js';

const Game = () => {
console.log("render")
    // After character selection:
    // 1. Run shuffle()
    // 2. Run drawCard() to draw two cards to player and Dealer
    // 3. Wait for player response

    const [deckId, setDeckId] = useState('')

    const [ playerCards, setPlayerCards ] = useState([])
    const [ dealerCards, setDealerCards ] = useState([])

// call a new deck, shuffle, draw 4 and save 2 each to playerCard and dealerCard state
    const startNewRound = (cardDrawCount) => {
        axios({
            url:'https://deckofcardsapi.com/api/deck/new/draw/',
            params:{
                count: cardDrawCount
            }
        }).then((res) => {
            const cardArray = res.data.cards
            setPlayerCards([cardArray[0], cardArray[2]])
            setDealerCards([cardArray[1], cardArray[3]])
        })
    }

    useEffect(() => { startNewRound(4) }, [])
    
    
    return (
    <div className="App">

        {/* <button onClick={() => { drawCard(deckId, 1) }}>draw card</button>
        <button onClick={() => { shuffle(deckId) }}>Shuffle</button> */}

        <ul className='playerCardList'>Player's cards
        {
            playerCards.map((card) => {
                return (
                    <li key={card.code}><img src={card.image} alt={card.value + card.suit} /></li>
                )
            })
        }
        </ul>

        <Player />

        <ul className='dealerCardList'>Dealer's cards
        {
            dealerCards.map((card) => {
                return (
                    <li key={card.code}><img src={card.image} alt={card.value + card.suit} /></li>
                )
            })
        }
        </ul>

    </div>
    );
}

export default Game;

    // On Load: render CharacterSelector.js

    // States: 
        // selected pokemon

        // Player evolution 
        // Dealer evolution

        // Player drawn card
        // Dealer drawn card

            // might not need card value ?

        // player card value
        // dealer card value

        // Player bust status
        // Dealer bust status

        // Player stand mode (true = stand, false = keep going)
        // Dealer stand mode

        // dealer's turn (true/false)
            // if true, rerender Dealer.js





            
    // End of round trigger:
    // Conditions: when one side busts or both stand
    // if bust, win side evolution state +1
    // if both stand, compare card value:
        // if card value = 21, evolution state +1
        // if card value < 21, higher card value side has evolution state +1
    // after updating evolution state, check if any evolution state = 3 (fully evolved)
        // if evolution state = 3, render Result.js, dismount Player.js and Dealer.js
        // if no fully evolved pokemon, start a new round (rerender Player.js and Dealer.js)