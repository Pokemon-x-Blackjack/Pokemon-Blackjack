import axios from "axios"
import { useState, useEffect } from "react"
import Game from "./Game"
import ErrorPage from "./Error404"

import pikaLoading from "../assets/loadingScreen/pikachu-running.gif"



const CharacterSelector = (props) => {
    // pokemon data from starting roster
    const [rosterArr, setRosterArr] = useState([])

    // pokemon evolutions needed for game
    const [evolutionArr, setEvolutionArr] = useState([])
    const [dealerEvolutionArr, setDealerEvolutionArr] = useState([])


    // loading screen
    const [isLoading, setIsLoading] = useState(false);
    // Api Error message
    const [apiError, setApiError] = useState('')


    // true when below state conditions are met  
    const [formSubmit, setFormSubmit] = useState(false)

    // true when evolutionArr is populated
    const [evolveReady, setEvolveReady] = useState(false)

    // onClick, updates to selected pokemon name
    const [userPokemon, setUserPokemon] = useState('')


    // list of starter pokemon 
    const rosterList = ['pichu', 'charmander', 'squirtle', 'bulbasaur', 'poliwag', 'chikorita', 'torchic', 'nidoran-m']


    // API calls a pokemon, returns promise
    const apiCallPokemon = (idOrName) => {
        // dynamic link based on specified id/name
        const pokeInfoUrl = new URL(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
        // storing axios request in variable
        const pokemonRequest = axios.get(pokeInfoUrl)
            .catch((error) => {
                if (error.response) {
                    const errorStatus = `Having trouble finding pokemon: ${error.response.statusText}`;
                    setApiError(errorStatus)
                }
            });

        return pokemonRequest;
    }

    // Makes call to evolution chain via species endpoint, saves three evolutions and returns arr
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
            .catch((error) => {
                if (error.response) {
                    const errorStatus = error.response.statusText;
                    setApiError(`Having trouble finding evolutions for ${name}: ${errorStatus}`)
                }
            })
        return speciesCall
    }

    // takes api response: creates direct path to data, makes obj and pushes to temp arr to be set to state
    const createPokeObj = (resObj, arr) => {
        if (resObj !== undefined) {
            const pokemonInfo = resObj.data

            const infoObj = {
                name: pokemonInfo.name,
                id: pokemonInfo.id,
                frontGifUrl: pokemonInfo.sprites.versions["generation-v"]['black-white'].animated['front_default'],
                backGifUrl: pokemonInfo.sprites.versions["generation-v"]['black-white'].animated['back_default'],
                evolutionThumb: pokemonInfo.sprites.versions["generation-v"]['black-white'].front_default,
                altFront: `${pokemonInfo.name} in an idle stance.`,
                altBack: `${pokemonInfo.name} facing towards the action in an idle stance.`
            }

            arr.push(infoObj)
        }
    }

    // takes apiCallEvolution response(arr), makes call on all evolutions, stored in state, evolve ready state updated

    const evolutionChainToObj = (evolutionRes, setState) => {
        if (evolutionRes !== undefined) {
            // resolve promise to use apiCallEvolution arr
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
                        // API data returns remove loading screen
                        setIsLoading(false);
                    })
            })
        }
    }



    // on component render: 
    // make api call for pokemon info, store in state
    useEffect(() => {

        // loading page on page load
        setIsLoading(true);

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

    // when user chooses pokemon
    // filter rosterlist, excluding user pokemon randomize a pokemon
    // fetch evolution arr. player can proceed
    useEffect(() => {
        const dealerRoster = rosterList.filter((pokemon) => { return pokemon !== userPokemon })
        const randomPokemon = (arr) => {
            return Math.floor(Math.random() * arr.length)
        }

        const randomDealer = dealerRoster[randomPokemon(dealerRoster)]

        evolutionChainToObj(apiCallEvolution(randomDealer), setDealerEvolutionArr)

        setEvolveReady(true)

    }, [userPokemon])

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


    // character select form submit: 
    const handleCharacterSubmit = (event) => {
        event.preventDefault()

        // checks if pokemon is chosen
        // renders game.js
        if (evolveReady === true) {
            setFormSubmit(true)
        }
    }

    return (
        <>
            {
                // checking for Api Error
                apiError !== '' ? (

                    <ErrorPage
                        apiError={apiError}
                        setButtonSelected={props.setButtonSelected}
                    />) :

                    // loading state for apiCallPokemon

                    isLoading ? (
                        <div className="loadingPage">
                            <h2>Loading...</h2>
                            <img src={pikaLoading} alt="Pikachu running as the game loads" />
                        </div>
                    ) :
                        // game component render on 

                        formSubmit === true ? (

                            <Game
                                evolutionArr={evolutionArr}
                                dealerEvolutionArr={dealerEvolutionArr}
                            />) :


                            // character selection
                            < section className="characterSelect" >
                                {/* wrapper */}
                                <div className="wrapper">
                                    {/* character selection form */}

                                    <form action="#" onSubmit={handleCharacterSubmit} className="characterForm">

                                        <h2>Choose your Pokemon</h2>
                                        {/* list of pokemon to choose from */}
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

