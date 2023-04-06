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
    // all pokemon from roster - populates ul
    const [rosterArr, setRosterArr] = useState([])

    // all pokemon evolutions based on user selection
    const [evolutionArr, setEvolutionArr] = useState([])

    // all pokemon evolutions based on enemy
    const [dealerEvolutionArr, setDealerEvolutionArr] = useState([])

    // onClick, updates to selected pokemon name
    const [userPokemon, setUserPokemon] = useState('')


    // set to true when evolution arr === 3
    const [evolveReady, setEvolveReady] = useState(false)

    // ONLY when user pokemon is selected AND evolutions have loaded, formSubmit === true and unmounts to game page
    const [formSubmit, setFormSubmit] = useState(false)



    const rosterList = ['pichu', 'charmander', 'squirtle', 'bulbasaur', 'poliwag', 'chikorita', 'torchic', 'nidoran-m']


    // API calls a pokemon, returns promise
    const apiCallPokemon = (idOrName) => {
        // dynamic link based on specified id/name
        const pokeInfoUrl = new URL(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
        // storing axios request in variable
        const pokemonRequest = axios.get(pokeInfoUrl)
        return pokemonRequest
    }

    // takes api response: creates direct path to data, makes obj and pushes to temp arr to be set to state
    const createPokeObj = (resObj, arr) => {
        const pokemonInfo = resObj.data

        const infoObj = {
            name: pokemonInfo.name,
            id: pokemonInfo.id,
            frontGifUrl: pokemonInfo.sprites.versions["generation-v"]['black-white'].animated['front_default'],
            backGifUrl: pokemonInfo.sprites.versions["generation-v"]['black-white'].animated['back_default'],
            altFront: `${pokemonInfo.name} in an idle stance.`,
            altBack: `${pokemonInfo.name} facing towards the action in an idle stance.`
        }

        arr.push(infoObj)
    }

    // on component render: 
    // generate enemy evolutions
    // make api call for pokemon info, store in state
    useEffect(() => {

        evolutionChainToObj(apiCallEvolution('abra'), setDealerEvolutionArr)
        // empty promise arr
        const starterPromises = []

        // making api calls for each pokemon -  storing promises in promise arr 
        rosterList.forEach((pokemon) => {
            starterPromises.push(apiCallPokemon(pokemon))
        })

        // ALL promises resolved? create specific obj per call, push to tempArr and save arr to state 
        Promise.all(starterPromises)
            .then((starterData) => {
                // EMPTY temp arr, once objs are made, save to 
                const tempArr = []

                // iterating through all starter pokemon
                starterData.forEach((starterObj) => {
                    //creating obj - sending to temp arr
                    createPokeObj(starterObj, tempArr)
                })
                // storing objs in state
                setRosterArr(tempArr)
            })

    }, [])

    // Makes complicated call to evolution chain, saves three evolutions and returns arr
    const apiCallEvolution = (name) => {
        // access species data via pokemon name
        const speciesUrl = new URL(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)

        const speciesCall = axios.get(speciesUrl)
            .then((speciesRes) => {
                // in species data, access evolution url
                const evolutionUrl = speciesRes.data.evolution_chain.url
                const evolutionCall = axios.get(evolutionUrl)
                    .then((evolveRes) => {
                        const dataPath = evolveRes.data.chain
                        // call evolution url, access to each evolution
                        const firstEvol = dataPath.species.name
                        const secondEvol = dataPath.evolves_to[0].species.name
                        const thirdEvol = dataPath.evolves_to[0].evolves_to[0].species.name

                        return [firstEvol, secondEvol, thirdEvol]
                    })
                return evolutionCall
            })
        return speciesCall
    }

    // takes apiCallEvolution response(arr), makes call on all evolutions, stored in state, evolve ready state updated

    const evolutionChainToObj = (evolutionRes, setState) => {
        // getting access to apiCallEvolution arr
        evolutionRes.then((evolutionNames) => {

            // empty promise arr
            const evolutionPromises = []

            // making api call to each evolution, pushing promise
            evolutionNames.forEach((pokemonName) => {
                evolutionPromises.push(apiCallPokemon(pokemonName))
            })

            // ALL promises ready? 
            Promise.all(evolutionPromises)
                .then((evolutionData) => {
                    // empty temp arr
                    const tempArr = []
                    evolutionData.forEach((pokemon) => {
                        // creating obj per pokemon, saving to tempArr
                        createPokeObj(pokemon, tempArr)
                    })

                    // storing in Evolution Arr
                    setState(tempArr);
                })
        })
    }

    // TESTING ONLY: console logs user dealer evolution arr 
    useEffect(() => {
        console.log('dealer', dealerEvolutionArr)
    }, [dealerEvolutionArr])
    // TESTING ONLY: console logs evolution arr 
    useEffect(() => {
        console.log('user', evolutionArr)
        if (evolutionArr !== '') {
            setEvolveReady(true)
        }
    }, [evolutionArr])


    // sets user pokemon on clicked pokemon, finds evolutions in background
    const handleClickSelect = (event) => {
        const clickedPokemon = event.target.textContent
        setUserPokemon(clickedPokemon)
        evolutionChainToObj(apiCallEvolution(clickedPokemon), setEvolutionArr)
    }

    // Accessibility: keyboard only users can select
    const handleFocusSelect = (event) => {
        event.target.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                handleClickSelect(event)
            }
        })
    }


    const handleCharacterSubmit = (event) => {
        event.preventDefault()

        if (userPokemon !== '' && evolveReady === true) {
            setFormSubmit(true)
            console.log('lets go to game')
            console.log('user pokemon', userPokemon)
        }
    }


    return (
        <>
            {formSubmit === true ?

                <Game
                    evolutionArr={evolutionArr}
                    dealerEvolutionArr={dealerEvolutionArr}
                /> :
                < section className="characterSelect" >
                    <div className="wrapper">
                        <form action="#" onSubmit={handleCharacterSubmit}>
                            <h2>Choose your Pokemon</h2>
                            <ul className="pokeRoster">
                                {rosterArr.map((pokemon) => {
                                    return (
                                        <li key={pokemon.id}>
                                            <div
                                                tabIndex={0}
                                                className={userPokemon === pokemon.name ? 'pokemonCard activeCard' : 'pokemonCard'}
                                                onClick={handleClickSelect}
                                                onFocus={handleFocusSelect}>

                                                <img
                                                    src={`${pokemon.frontGifUrl}`}
                                                    alt={`${pokemon.altFront}`}
                                                />
                                                <h3>{pokemon.name}</h3>
                                            </div>
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

