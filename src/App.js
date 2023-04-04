import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import CharacterSelector from './components/CharacterSelector';
import Game from './components/Game';

// App.js
// Contains "Start Button"
// onClick: display none star button, render Game.js

import './sass/App.scss';
function App() {
  return (
    <div className="App">
      <CharacterSelector />
    </div>
  );
}

export default App;
