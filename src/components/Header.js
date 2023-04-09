import logo from '../assets/logo.png';
import { useState, useRef } from 'react';
import audio from '../assets/audio/kung-fu-fighting.mp3';


const Header = () => {

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


<div className="wrapper">
 
  <header className="header">
   
    <div className="logo">
      <img src={logo} alt="pokejack with pokeball as the o" />
    </div>
    
    <i
      className={isPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute'}
      onClick={togglePlay}
    />
   
    {isPlaying && (
      <div id="audioSlider">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="slider"
          id="volumeSlider"
          onChange={handleVolumeChange}
        />
      </div>
    )}

    <audio src={audio} ref={audioElementRef} />
  </header>
</div>
    
  );
};

export default Header;