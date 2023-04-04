
import Header from './components/Header';
import Footer from './components/Footer';
import './sass/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import CharacterSelector from './components/CharacterSelector';
import Game from './components/Game';

// App.js
// Contains "Start Button"
// onClick: display none star button, render Game.js

function App() {
  return (
    <div className="App">

      <Header />
      <Footer />




    </div>
  );
}

export default App;
