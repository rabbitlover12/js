import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  

  return (
    <>      
      <Router>
        <Header/>
        <div className='APP'>
          <Routes>
            <Route path="/" element={<Home />} />          
          </Routes>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
