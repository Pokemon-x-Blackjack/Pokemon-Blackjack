// Game.js
import { useEffect, useState } from 'react';
import axios from 'axios';

import Player from './Player.js';
import Dealer from './Dealer.js';

const Game = (props) => {

    const [deckId, setDeckId] = useState('')

    const [playerCards, setPlayerCards] = useState([])
    const [dealerCards, setDealerCards] = useState([])


    const [ playerCardVal, setPlayerCardVal ] = useState(0);
    const [ dealerCardVal, setDealerCardVal ] = useState(0);

    const [ playerStandMode, setPlayerStandMode ] = useState(false);
    const [ dealerStandMode, setDealerStandMode ] = useState(false);

    const [ playerBustStatus, setPlayerBustStatus ] = useState(false);
    const [ dealerBustStatus, setDealerBustStatus ] = useState(false);


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
    const drawOne = (deckId, state, setState) => {
        axios({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
        }).then((res) => {
            setState([...state, res.data.cards[0]])
            console.log("draw one")
        }).catch("error")
    }

    const handleStand = () => {
        console.log("player stand")
        setPlayerStandMode(true)
    }

// handle hit button on click
    const handleHit = () => {
        drawOne(deckId, playerCards, setPlayerCards);
    }


// function that calculates total card value
    const calcCardValue = (cardListState, setState) => {
    // define value for the special cards
        const cardValues = {
            ACE: 11,
            JACK: 10,
            QUEEN: 10,
            KING: 10
        };

        if (cardListState.length > 0) {
            // create an array that stores card value (ACE = 11)
            const cardValArray = cardListState.map(card => {
                const value = cardValues[card.value] || Number(card.value);
                return value;
            })


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
                
                setState(finalSum)
                // console.log("finalSum", finalSum)

            } else {
            // ACE is still 11
                setState(playerSum)
            }

        } else {
            console.log("no player card")
        }
    }

    const dealerLogic = () => {
        if (dealerCardVal > 21){
            console.log("dealer bust")
            setDealerBustStatus(true)
        } else if (dealerCardVal <= 21 && dealerCardVal >= 17) {
            console.log("dealer stand")
            setDealerStandMode(true)
        } else if (dealerCardVal < 17) {
            console.log("dealer continue")
            drawOne(deckId, dealerCards, setDealerCards);
        }
    }


    // Start a new round on component load
    useEffect(() => { startNewRound(4) }, [])


// ************* PLAYER LOGIC ****************
    // Calc player cards value and set state everytime player cards change
    useEffect(() => {
        calcCardValue(playerCards, setPlayerCardVal)
    }, [playerCards]) 
    
    // after setting player cards val, set player's status 
    useEffect(() => {
        if (playerCardVal > 21) {
            setPlayerBustStatus(true)
            console.log("player bust")
        } else if (playerCardVal === 21) {
            setPlayerStandMode (true)
            console.log("player blackjack")
        } else if (playerCardVal < 21) {
            console.log("player continue game")
        }
    }, [playerCardVal])
// *********** END: PLAYER LOGIC **************


// *************** DEALER LOGIC *****************
    // Start Dealer logic once player's status is set to stand
    useEffect(() => {
        console.log("run dealer")
    // this is running initially on load of game before deckId is created
        if (playerStandMode === true){
            if (deckId) {
                dealerLogic();
            }
        }
    }, [playerStandMode])

    // after drawing one card to dealer, evaluate dealer's card value
    useEffect(() => {
        console.log("dealer's cards", dealerCards)
        calcCardValue(dealerCards, setDealerCardVal)
    }, [dealerCards])

    // after evaluating dealer's card val, run dealerLogic to determine dealer's next step
    useEffect(() => {
        if (playerStandMode){
            console.log("dealer logic running, card valu:",dealerCardVal)
            dealerLogic()
        }
    }, [dealerCardVal])
    
// *********** END: DEALER LOGIC ***************

    return (
    <div className="App">

        <Player 
            standMode={playerStandMode}
            playerCards={playerCards}
            bustStatus={playerBustStatus}
            cardValue={playerCardVal}
            evolutionArr={evolutionArr}
            handleStand={handleStand}
            handleHit={handleHit}
        />

        <Dealer
            dealerCards={dealerCards}
            cardValue={dealerCardVal}
        />

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