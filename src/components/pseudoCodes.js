// App.js
    // Contains "Start Button"
        // onClick: display none star button, render Game.js

// Game.js
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


    // CharacterSelector.js
        // 6 buttons for 6 pokemon options
            // onClick: 
                // store value to "selected pokemon" state
                // dismount characterSelector.js
                // render Player.js and Dealer.js

    // Player.js
        // Contains: player pokemon, current cards, action buttons
            // all render onLoad
        
        // PlayerInfo.js (player pokemon)   
            // listens to: "selected pokemon" state, "player evolution" state

        // Cards.js
            // listens to: "player drawn card" state

        // ButtonList.js
            // Stand: set "status" state to "stand" (or false), pass turn to dealer (disable action buttons)
            // Hit: 
                // 1. run draw card function 
                // 2. evaluate player's card value
                    // if player card value >21, set player bust status = true
                    // if player card value <21, set player stand mode = false
                    // if player card value =21, set player stand mode = true

    // Dealer.js
        // Contains: dealer pokemon, current cards
        // Once player status is stand:
            // 1. run draw card function
            // 2. evaluate dealer's card value
                // if value <17, run draw card function again
                // if (21 >= value >= 17), set dealer stand mode = true
                // if value > 21, set dealer bust status = true


    // End of round trigger:
        // Conditions: when one side busts or both stand
        // if bust, win side evolution state +1
        // if both stand, compare card value:
            // if card value = 21, evolution state +1
            // if card value < 21, higher card value side has evolution state +1
        // after updating evolution state, check if any evolution state = 3 (fully evolved)
            // if evolution state = 3, render Result.js, dismount Player.js and Dealer.js
            // if no fully evolved pokemon, start a new round (rerender Player.js and Dealer.js)


// To start a new round:
    // setPlayerStandMode to false
    // setDealerStandMode to false
    // setplayerBustStatus to false
    // setDealerBustStatus to false
    // clear states: player&dealerCards, player&dealerCardsVal
        // write a draw 4 function with existing deckId 
    // const drawFour = (deckId) => {
    //     axios({
    //         url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`,
    //     }).then((res) => {
    //         setPlayerCards([cardArray[0], cardArray[2]])
    //         setDealerCards([cardArray[1], cardArray[3]])
    //     })
    // }


