import {BrowserRouter,  Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Game from './components/Game';
import Result from './components/Result';

// App.js
// Contains "Start Button"
// onClick: display none star button, render Game.js

import './sass/App.scss';
import CharacterSelector from './components/CharacterSelector';
function App() {
  return (
    <div className="App">
      <Landing/>
      <Routes>
        <Route path="/module" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
