import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Landing from './components/Landing';
import Result from './components/Result';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorPage from './components/Error404';

import './css/App.css';
// import './sass/App.scss';




function App() {
  // const [currentPage, setCurrentPage] = useState('')

  return (
    <div className="App">

      <Routes>
        <Route path="/module" element={<Result />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>

      <Header
        // currentPage={currentPage}
      />
      <main>
        <Landing
          // setCurrentPage={setCurrentPage}
        />
      </main>
      <Footer
        // currentPage={currentPage}
      />


    </div>
  );
}

export default App;