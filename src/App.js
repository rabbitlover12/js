import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Postlist from './pages/postlist';
import Postlist2 from './pages/postlist2';
import PostDetail from './pages/postdetail';

function App() {
  return (
    <Router>      
        <Header />        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/postlist" element={<Postlist />} />
            <Route path="/postlist2" element={<Postlist2 />} />
            <Route path="/postdetail/:id" element={<PostDetail />} />
            <p>바잉</p>
            <p>하잉2</p>
          </Routes>        
        <Footer />      
    </Router>
  );
}

export default App;