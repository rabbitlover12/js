import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Second from './pages/second';
import Third from './pages/third';
import Five from './pages/five';


function App() {
  return (
    <Router>
      <div className='APP'>
        <Navbar bg='dark' variant="dark">
          <Container className='barList'>
            <Navbar.Brand href='/'>Music</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='/'>1</Nav.Link>
              <Nav.Link href='/2'>2</Nav.Link>      
              <Nav.Link href='/3'>3</Nav.Link>
              <Nav.Link href='/5'>5</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/2" element={<Second />} /> 
          <Route path="/3" element={<Third />} />
          <Route path="/5" element={<Five />} />        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
