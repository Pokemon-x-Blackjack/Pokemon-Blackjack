import { useEffect, useState } from "react";

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
        return 'greenyellow'
      }
    }

    const progressHeight = ((evolutionPoint + 1) / 3) * 100

    const progressColor = checkColor()

    setProgress({ height: progressHeight, color: progressColor })

  }, [evolutionPoint])

  // evolution thumbs
  console.log(evolutionArray)
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

            <div className="pokeOverlay"></div>

            <img src={`${evolutionArray[2].evolutionThumb}`} alt={`${evolutionArray[2].altFront}`} />
          </li>

          {/* second evolution */}

          <li className={"thumbContainer " + (evolutionPoint < 1 ? "pokeballAnimate" : "revealPokemon")}>

            {/* pokeball overlay */}
            <div className="pokeOverlay"></div>

            {/* pokemon img */}
            <img src={`${evolutionArray[1].evolutionThumb}`} alt={`${evolutionArray[1].altFront}`} />
          </li>

          <li className={"thumbContainer " + (evolutionPoint < 0 ? "pokeballAnimate " : "revealPokemon")}>

            {/* pokeball overlay */}
            <div className="pokeOverlay"></div>

            {/* pokemon img */}
            <img src={`${evolutionArray[0].evolutionThumb}`} alt={`${evolutionArray[0].altFront}`} />
          </li>

        </ul>
      </div >
    </>
  );
};

export default Evolvebar;
