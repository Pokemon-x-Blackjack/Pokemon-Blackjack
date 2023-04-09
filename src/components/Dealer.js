// Dealer.js
import cardBack from '../assets/card-back.png';
import Evolvebar from './Evolvebar';

// Contains: dealer pokemon, current cards
// Once player status is stand:
// 1. run draw card function
// 2. evaluate dealer's card value
// if value <17, run draw card function again
// if (21 >= value >= 17), set dealer stand mode = true
// if value > 21, set dealer bust status = true

const Dealer = (props) => {
    // const [ flipDealerCard, setFlipDealerCard ] = useState(false);

    const dealerCardsProp = props.dealerCards
    const currentEvolution = props.dealerEvolutionArr[props.dealerEvolution]

    // if (playerStandMode && dealerStandMode) {
    //     setFlipDealerCard(true);
    // }

    return (
        <section className="dealer">
            <ul className='dealerCardList'>Dealer's cards
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

            <div className='pokemonStats'>
                <div className="playStats">
                    <img src={currentEvolution.frontGifUrl} alt={currentEvolution.altFront} />
                    <h3>{currentEvolution.name}</h3>
                </div>

                <Evolvebar
                    // dealer's version
                    evolutionArray={props.dealerEvolutionArr}
                    evolutionPoint={props.dealerEvolution}
                    barType='dealer'
                />
            </div>


            <p>Dealer's cards value: {props.cardValue}</p>
        </section>
    )
}

export default Dealer;