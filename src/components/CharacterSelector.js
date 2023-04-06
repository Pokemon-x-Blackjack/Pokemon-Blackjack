// CharacterSelector.js

// 6 buttons for 6 pokemon options
// onClick: 
// store value to "selected pokemon" state
// dismount characterSelector.js
// render Player.js and Dealer.js
import axios from "axios"
import { useState, useEffect } from "react"
import Game from "./Game"
import pikaLoading from '../assets/loadingScreen/pikachu-running.gif'

const CharacterSelector = () => {
    // all pokemon from roster - populates ul
    const [rosterArr, setRosterArr] = useState([])

    // all pokemon evolution based on user selection
    const [evolutionArr, setEvolutionArr] = useState([])

    // onClick, updates to selected pokemon name
    const [userPokemon, setUserPokemon] = useState('')

    // set to true when evolution arr === 3
    const [evolveReady, setEvolveReady] = useState(false)

    // ONLY when user pokemon is selected AND evolutions have loaded, formSubmit === true and unmounts to game page
    const [formSubmit, setFormSubmit] = useState(false)

    // temp arr, once all api calls are made, setState(temparr)
    const tempArr = []

    // 1. hard coded starter characters - all have 3 evolutions total
    const rosterList = ['pichu', 'charmander', 'squirtle', 'bulbasaur']

    // loading screen
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);





    // 1.b  api call for 1 pokemon base on name, sends to a specified array
    const apiCallPokemon = (idOrName, setArr) => {


        const pokeUrl = new URL(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
        axios({
            url: pokeUrl
        }).then((response) => {
            // data path
            const pokemonInfo = response.data
            setIsLoading(false)

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

            setArr([...tempArr])
        })
    }



    // on component render: make api call for pokemon info, store in state
    useEffect(() => {
            // loading page
            setIsLoading(true);

            

        // getting data for all starter pokemon
        rosterList.forEach((pokemon) => {
            apiCallPokemon(pokemon, setRosterArr)
        })

    }, [])

    const getEvolution = (name) => {

        //using userPokemon name to access species data 
        const speciesUrl = new URL(`https://pokeapi.co/api/v2/pokemon-species/${name}/`)

        axios({
            url: speciesUrl
        }).then((speciesRes) => {

            // in species data, access evolution url
            const evolutionUrl = speciesRes.data.evolution_chain.url

            axios({
                url: evolutionUrl
            }).then((evolveRes) => {
                const dataPath = evolveRes.data.chain

                // call evolution url, access to each evolution
                const firstEvol = dataPath.species.name
                const secondEvol = dataPath.evolves_to[0].species.name
                const thirdEvol = dataPath.evolves_to[0].evolves_to[0].species.name
                // make individual calls on each name 
                apiCallPokemon(firstEvol, setEvolutionArr)
                apiCallPokemon(secondEvol, setEvolutionArr)
                apiCallPokemon(thirdEvol, setEvolutionArr)
            })
        })
    }

    const handleClickSelect = (event) => {
        setUserPokemon(event.target.textContent)
        console.log(event.target.textContent)
        getEvolution(event.target.textContent)
    }

    const handleFocusSelect = (event) => {
        event.target.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                setUserPokemon(event.target.textContent)
                console.log(event.target.textContent)
                getEvolution(event.target.textContent)
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

    // testing - when user selects pokemon, console.log updates to evolution arr
    useEffect(() => {
        console.log(evolutionArr)
        if (evolutionArr.length === 3) {
            console.log('evolutionArr ready')
            setEvolveReady(true)
        }
    }, [evolutionArr])


    
    return (
        <>
         {isLoading ? ( // Show loading page if isLoading is true
      <div className="loadingPage">
        <h2>Loading...</h2>
        <img src={pikaLoading}/>
        {/* Add  loading page code here */}
      </div>
         ) :
            formSubmit ? ( 

                <Game evolutionArr={evolutionArr}/> 
                ):(
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
                )}

        </>
        
    )

}
export default CharacterSelector;

