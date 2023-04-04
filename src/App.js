import {BrowserRouter,  Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import CharacterSelector from './components/CharacterSelector';
import Game from './components/Game';

// App.js
    // Contains "Start Button"
        // onClick: display none star button, render Game.js

import './css/App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/play" element={<Game/>}/>
      </Routes>
      

    </div>
  );
}

export default App;
