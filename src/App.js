import Game from "./components/Game.js"
import Header from './components/Header';
import Footer from './components/Footer';
import CharacterSelector from './components/CharacterSelector';
import './sass/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';


function App() {
  return (
    <div className="App">
      
      <Header />
      <Game />
      <Footer />

    </div>
  );
}

export default App;
