import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Result from './components/Result';
import Header from './components/Header';
import Footer from './components/Footer';
import CharacterSelector from './components/CharacterSelector';
import ErrorPage from './components/Error404';

import './css/App.css';
// import './sass/App.scss';




function App() {
  return (
    <div className="App">


      <Header />
      <Routes>
        <Route path="/module" element={<Result />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>

      <Header />
      <main>
        <Landing />
      </main>
      <Footer />
     

    </div>
  );
}

export default App;