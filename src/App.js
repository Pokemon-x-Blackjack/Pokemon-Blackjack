import {BrowserRouter,  Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Result from './components/Result';
import Header from './components/Header';
import Footer from './components/Footer';
import CharacterSelector from './components/CharacterSelector';
import './sass/App.scss';




function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/module" element={<Result />} />
      </Routes>
      
      <Header />
      <Landing/>
      <Footer />

    </div>
  );
}

export default App;
