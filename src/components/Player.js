// Player.js

const Player = (props) => {
    const playerCardsProp =  props.playerCards
    
    return (
        <section className="playerSection">
            <ul className='playerCardList'>Player's cards
                {
                    playerCardsProp.map((card) => {
                        return (
                            <li key={card.code}><img src={card.image} alt={card.value + card.suit} /></li>
                        )
                    })
                }
            </ul>
            
            <p>player's card value: {props.cardValue}</p>

            {
                props.standMode
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