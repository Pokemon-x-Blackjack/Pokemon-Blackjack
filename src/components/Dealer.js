// Dealer.js
        // Contains: dealer pokemon, current cards
        // Once player status is stand:
            // 1. run draw card function
            // 2. evaluate dealer's card value
                // if value <17, run draw card function again
                // if (21 >= value >= 17), set dealer stand mode = true
                // if value > 21, set dealer bust status = true

const Dealer = (props) => {
    const dealerCardsProp = props.dealerCards

    return (
        <section className="dealer">
            <ul className='dealerCardList'>Dealer's cards
            {
                dealerCardsProp.map((card) => {
                    return (
                        <li key={card.code}><img src={card.image} alt={card.value + card.suit} /></li>
                    )
                })
            }
            </ul>
            <p>Dealer's cards value: {props.cardValue}</p>
        </section>
    )
}

export default Dealer;