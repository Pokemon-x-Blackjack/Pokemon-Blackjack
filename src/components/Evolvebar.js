import { useEffect, useState } from "react";
import pokeballOverlay from '../assets/pokeballOverlay.png'
const Evolvebar = ({ evolutionArray, evolutionPoint, barType }) => {

  // progress bar
  const [progress, setProgress] = useState({})

  useEffect(() => {

    const checkColor = () => {
      if (evolutionPoint === 0) {
        return '#43465E'
      } else if (evolutionPoint === 1) {
        return '#131834'
      } else {
        return '#C1071E'
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
        className="evolveStats"
        style={barType === 'dealer' ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }}
      >

        {/* Evolve Bar */}
        <div className="evolveContainer">
          <div
            className="evolveProgress"
            style={{
              height: `${progress.height}%`,
              backgroundColor: `${progress.color}`
            }}
          >
          </div>
        </div >


        {/* Unlocked Evolutions */}
        <ul className="evolutionThumbs">

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