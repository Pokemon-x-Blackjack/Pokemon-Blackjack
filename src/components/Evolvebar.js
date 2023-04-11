import { useEffect, useState } from "react";
import pokeballOverlay from '../assets/pokeballOverlay.png'
const Evolvebar = ({ evolutionArray, evolutionPoint, barType }) => {

  // progress bar
  const [progress, setProgress] = useState({})

  useEffect(() => {

    const checkColor = () => {
      if (evolutionPoint === 0) {
        return 'red'
      } else if (evolutionPoint === 1) {
        return 'yellow'
      } else {
        return 'green'
      }
    }

    const progressHeight = ((evolutionPoint + 1) / 3) * 100

    const progressColor = checkColor()

    setTimeout(() => {
      setProgress({ height: progressHeight, color: progressColor })
    }, 1000)

  }, [evolutionPoint])

  // evolution thumbs
  return (
    <>
      <div
         className="evolutionContainer"
        style={barType === 'player' ? { alignItems: 'flex-start' } : null }
      >

        {/* Evolve Bar */}
        <div className="evolveContainer"
          style={barType === 'dealer' ? { alignItems: 'flex-end' } : null }
        >
          <div
            className="evolveProgress"
            style={{
              width: `${progress.height}%`,
              backgroundColor: `${progress.color}`
            }}
          >
          </div>
        </div >


        {/* Unlocked Evolutions */}
        <ul className="evolutionThumbs"
            style={barType === 'player' ? { flexDirection: 'row-reverse' } : null }
        >

          {/* final evolution */}
          <li className={"thumbContainer " + (evolutionPoint < 2 ? "pokeballAnimate" : "revealPokemon")}>

            {/* pokeball overlay */}
            <div className="pokeOverlay"
              style={{ backgroundImage: `url(${pokeballOverlay})` }}
            ></div>

            <img src={`${evolutionArray[2].evolutionThumb}`} alt={`${evolutionArray[2].altFront}`} />
          </li>

          {/* second evolution */}

          <li className={"thumbContainer " + (evolutionPoint < 1 ? "pokeballAnimate" : "revealPokemon")}>

            {/* pokeball overlay */}
            <div className="pokeOverlay"
              style={{ backgroundImage: `url(${pokeballOverlay})` }}
            ></div>

            {/* pokemon img */}
            <img src={`${evolutionArray[1].evolutionThumb}`} alt={`${evolutionArray[1].altFront}`} />
          </li>

          <li className={"thumbContainer " + (evolutionPoint < 0 ? "pokeballAnimate " : "revealPokemon")}>

            {/* pokeball overlay */}
            <div className="pokeOverlay"
              style={{ backgroundImage: `url(${pokeballOverlay})` }}
            ></div>

            {/* pokemon img */}
            <img src={`${evolutionArray[0].evolutionThumb}`} alt={`${evolutionArray[0].altFront}`} />
          </li>

        </ul>
      </div >
    </>
  );
};

export default Evolvebar;