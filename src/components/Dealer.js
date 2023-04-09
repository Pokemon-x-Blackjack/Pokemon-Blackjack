// Dealer.js
// import revealCard from '../RevealCard.module.css'
import cardBack from '../assets/card-back.png';
import { useState, useEffect } from 'react'


const Dealer = (props) => {
    const [ pokemonUrl, setPokemonUrl ] = useState(props.dealerEvolutionArr[props.dealerEvolution].frontGifUrl);

    const dealerCardsProp = props.dealerCards

    const currentEvolution = props.dealerEvolutionArr[props.dealerEvolution]

// evolution animation 
    useEffect(() => {
        if (props.dealerEvolutionArr[props.dealerEvolution - 1]?.frontGifUrl !== undefined){
            setTimeout(() => {
                let intervalId = setInterval(() => {
                    setPokemonUrl((pokemon) => 
                    pokemon === props.dealerEvolutionArr[props.dealerEvolution].frontGifUrl
                    ? props.dealerEvolutionArr[props.dealerEvolution - 1].frontGifUrl
                    : props.dealerEvolutionArr[props.dealerEvolution].frontGifUrl
                    )
                }, 50) // how fast the image toggles
                
                setTimeout(() => {
                    clearInterval(intervalId);
                    setPokemonUrl(props.dealerEvolutionArr[props.dealerEvolution].frontGifUrl)
                }, 1100); // evoluting time (evolution animation)

                setPokemonUrl(props.dealerEvolutionArr[props.dealerEvolution].frontGifUrl)
            }, 400) // delay start of evolution
        }
    }, [props.dealerEvolution])

    const dealerCardClass = props.playerStand && props.dealerStand ? `reveal dealerCardList` : "dealerCardList";

    return (
        <section className="dealer">
            <ul className={dealerCardClass}>Dealer's cards
                    {
                        dealerCardsProp.map((card) => {
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
                <img src={pokemonUrl} alt={currentEvolution.altFront} />
                <h3>{currentEvolution.name}</h3>
            </div>


            <p>Dealer's cards value: {props.cardValue}</p>

            {
                props.bustStatus
                ? <p className="bust">BUST</p>
                : null
            }
            
        </section>
    )
}

export default Dealer;