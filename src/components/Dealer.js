// Dealer.js
// import revealCard from '../RevealCard.module.css'
import cardBack from '../assets/card-back.png';
import Evolvebar from './Evolvebar';
import { useState, useEffect } from 'react'

// Contains: dealer pokemon, current cards
// Once player status is stand:
// 1. run draw card function
// 2. evaluate dealer's card value
// if value <17, run draw card function again
// if (21 >= value >= 17), set dealer stand mode = true
// if value > 21, set dealer bust status = true




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

    const dealerCardClass = (props.playerStand && props.dealerStand) || props.bustStatus ? `reveal dealerCardList` : "dealerCardList";

    return (
        <div className="dealerSection">

            <div className='pokemonStat'>
                <Evolvebar
                    // dealer specific
                    evolutionArray={props.dealerEvolutionArr}
                    evolutionPoint={props.dealerEvolution}
                    barType='dealer'
                />
            </div>

            <div className="pokemonMain">

                <div className="playStats">
                    <img src={pokemonUrl} alt={currentEvolution.altFront} />
                    <h3>{currentEvolution.name}</h3>
                </div>

                <ul className={dealerCardClass}>
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


            </div>
            <p style={{textAlign: "end"}}>CARD VALUE: {props.cardValue}</p>        


            

            {
                props.bustStatus
                ? <p className="bust">BUST</p>
                : null
            }
            
        </div>
    )
}

export default Dealer;