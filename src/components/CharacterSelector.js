// CharacterSelector.js
// 6 buttons for 6 pokemon options
// onClick: 
// store value to "selected pokemon" state
// dismount characterSelector.js
// render Player.js and Dealer.js
import axios from "axios"
import { useState, useEffect } from "react"
import Game from "./Game"
const CharacterSelector = () => {
    // contain all objs from api call
    const [roster, setRoster] = useState([])

    const [userPokemon, setUserPokemon] = useState('')

    const [formSubmit, setFormSubmit] = useState(false)

    // on component render
    // make call per pokemon via pokeRoster
    // store info in roster State
    useEffect(() => {
        // temp arr, once all api calls are made, setRoster(temparr)
        const tempArr = []

        // 1. hard coded starter characters - all have 3 evolutions total
        const rosterList = ['pichu', 'charmander', 'squirtle', 'bulbasaur']

        // 1.b created api call function for 1 pokemon
        const apiCallPokemon = (idOrName) => {
            const pokeUrl = new URL(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
            axios({
                url: pokeUrl
            }).then((response) => {
                // data path
                const pokemonInfo = response.data

                // template obj: only retrieving data needed
                const infoObj = {
                    name: pokemonInfo.name,
                    id: pokemonInfo.id,
                    frontGifUrl: pokemonInfo.sprites.versions["generation-v"]['black-white'].animated['front_default'],
                    backGifUrl: pokemonInfo.sprites.versions["generation-v"]['black-white'].animated['back_default'],
                    altFront: `${pokemonInfo.name} in an idle stance.`,
                    altBack: `${pokemonInfo.name} facing towards the action in an idle stance.`
                }

                tempArr.push(infoObj)

                setRoster([...tempArr])
            })
        }

        rosterList.forEach((pokemon) => {
            apiCallPokemon(pokemon)
        })

    }, [])


    const handleCharacterSelect = (event) => {
        setUserPokemon(event.target.value)
    }


    const handleCharacterSubmit = (event) => {
        event.preventDefault()

        // code to dismount

        if (userPokemon !== '') {
            setFormSubmit(true)
            console.log('lets go to game')
        }
    }
    return (
        <>
            {formSubmit === true && userPokemon !== '' ? <Game /> :
                < section className="characterSelect" >
                    <div className="wrapper">
                        <form action="#" onSubmit={handleCharacterSubmit}>
                            <h2>Choose your Pokemon</h2>
                            <ul className="pokeRoster">
                                {roster.map((pokemon) => {
                                    return (
                                        <li
                                            key={pokemon.id}
                                            className="pokemonCard"
                                            value={pokemon.name}
                                            onClick={handleCharacterSelect}>

                                            <img
                                                src={`${pokemon.frontGifUrl}`}
                                                alt={`${pokemon.altFront}`}
                                            />
                                            <h3>{pokemon.name}</h3>

                                        </li>
                                    )
                                })}
                            </ul>
                            <button>All Set!</button>
                        </form>
                    </div>
                </section >
            }

        </>
    )
}

export default CharacterSelector;