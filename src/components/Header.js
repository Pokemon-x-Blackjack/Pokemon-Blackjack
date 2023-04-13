
import { useState, useRef } from 'react';
import audio from '../assets/audio/poke-chill.mp3';
import pokeOverlay from '../assets/pokeballOverlay.png'


const Header = ({ currentPage }) => {

  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElementRef = useRef(null);

  const togglePlay = () => {
    const audioElement = audioElementRef.current;
    if (!isPlaying) {
      audioElement.volume = volume / 100;
      audioElement.play();
    } else {
      audioElement.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const audioElement = audioElementRef.current;
    setVolume(event.target.value);
    audioElement.volume = event.target.value / 100;
    if (isPlaying) {
      audioElement.play();
    }
  };


  return (

    <header>
      {/* wrapper */}
      <div className="wrapper">

        {/* logo */}
        <div className="logo">
          <img src={pokeOverlay} alt="Main logo for Pokemon Blackjack." />
        </div>

        {/* audio section */}
        <div className="audioContainer">

          {/* audio btn */}
          <button
            className="musicToggleBtn"
            onClick={togglePlay}
          >
            <i
              className={isPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute'}
            />
            <span className='sr-only'>music button toggle</span>


          </button>

          {isPlaying && (
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              className="slider"
              id="volumeSlider"
              onChange={handleVolumeChange}
            />
          )}

          <audio src={audio} ref={audioElementRef} />
        </div>
      </div>
    </header>

  );
};

export default Header;