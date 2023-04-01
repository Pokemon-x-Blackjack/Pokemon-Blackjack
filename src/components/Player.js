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