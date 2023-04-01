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





            
    // End of round trigger:
    // Conditions: when one side busts or both stand
    // if bust, win side evolution state +1
    // if both stand, compare card value:
        // if card value = 21, evolution state +1
        // if card value < 21, higher card value side has evolution state +1
    // after updating evolution state, check if any evolution state = 3 (fully evolved)
        // if evolution state = 3, render Result.js, dismount Player.js and Dealer.js
        // if no fully evolved pokemon, start a new round (rerender Player.js and Dealer.js)