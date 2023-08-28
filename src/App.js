import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Postlist from './pages/postlist'

function App() {
  return (
    <Router>      
        <Header />        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/postlist" element={<Postlist />} />
          </Routes>        
        <Footer />      
    </Router>
  );
}

export default App;