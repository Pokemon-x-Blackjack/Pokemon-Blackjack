// Game.js

import { useEffect, useState } from 'react';
import axios from 'axios';

import Player from './Player.js';
import Dealer from './Dealer.js';

const Game = (props) => {

    const [deckId, setDeckId] = useState('')

    const [playerCards, setPlayerCards] = useState([])
    const [dealerCards, setDealerCards] = useState([])

    const [playerStandMode, setPlayerStandMode] = useState(false);

    const [playerBustStatus, setPlayerBustStatus] = useState(false);


    const evolutionArr  =  props.evolutionArr


    // call a new deck, shuffle, draw 4 and save 2 each to playerCard and dealerCard state, save deckId
    const startNewRound = (cardDrawCount) => {
        axios({
            url: 'https://deckofcardsapi.com/api/deck/new/draw/',
            params: {
                count: cardDrawCount
            }
        }).then((res) => {
            const cardArray = res.data.cards
            setDeckId(res.data.deck_id)

            setPlayerCards([cardArray[0], cardArray[2]])
            setDealerCards([cardArray[1], cardArray[3]])
        })
    }

    // call API to draw a card
    const drawOne = (deckId) => {
        axios({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
        }).then((res) => {
            setPlayerCards([...playerCards, res.data.cards[0]])
        })
    }

    const handleStand = () => {
        setPlayerStandMode(true)
    }

    const handleHit = () => {
        drawOne(deckId);
    }

    // function that calculates total card value
    const calcCardValue = () => {
        // define value for the special cards
        const cardValues = {
            ACE: 11,
            JACK: 10,
            QUEEN: 10,
            KING: 10
        };

        if (playerCards) {
            // create an array that stores card value (ACE = 11)
            const cardValArray = playerCards.map(card => {
                const value = cardValues[card.value] || Number(card.value);
                return value;
            })

            console.log(cardValArray)

            // reduce() is an array method that contains two argument: callbackFn & initial val (optional)
            // the callbackFn has two params: accumulator & currentValue
            // accumulator: accumulated value from previous callbackFn
            // currentValue: the value of the array number being accessed
            const playerSum = cardValArray.reduce((total, num) => total + num, 0) // calculate sum of cards

            if (playerSum > 21) {
                // dynamic ACE value conditional
                const newValArray = cardValArray.map(card => {
                    if (card === 11) {
                        return 1;
                    } else {
                        return card
                    }
                })
                // console.log("final card array", newValArray)

                // calculate final sum after changing dynamic ACE value
                const finalSum = newValArray.reduce((total, num) => total + num, 0)

                return finalSum
                // console.log("finalSum", finalSum)

            } else {
                // ACE is still 11
                return playerSum
            }

        } else {
            console.log("no player card")
        }
    }


    // Start a new round on component load
    useEffect(() => { startNewRound(4) }, [])

    // Change player's status according to drawn card
    useEffect(() => {
        const playerValue = calcCardValue();
        if (playerValue > 21) {
            setPlayerBustStatus(true)
            console.log("bust")
        } else if (playerValue === 21) {
            setPlayerStandMode(true)
            console.log("blackjack")
        } else if (playerValue < 21) {
            console.log("continue game")
        }
    }, [playerCards])

    return (
        <>
            <section className="gamePage">
                <div className="wrapper">
                    <Player
                        standMode={playerStandMode}
                        playerCards={playerCards}
                        bustStatus={playerBustStatus}
                        handleStand={handleStand}
                        handleHit={handleHit}
                        cardValue={calcCardValue()}
                        evolutionArr={evolutionArr}

                    />

                    <Dealer
                        dealerCards={dealerCards}
                    />

                </div>
            </section>
        </>
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