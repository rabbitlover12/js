import React, { useState } from 'react';
import './css/Header.css';
import { Nav,  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

function Header() {
const [signUpModalShow, setSignUpModalShow] = useState(false);
 const [signInModalShow, setSignInModalShow] = useState(false);
  
function handleSignUpModalClose() {
      setSignUpModalShow(false);
    }
  
function handleSignInModalClose() {
      setSignInModalShow(false);
    }


  return (
    <div className="App">
    <SignUpModal show={signUpModalShow} onHide={handleSignUpModalClose} />
    <SignInModal show={signInModalShow} onHide={handleSignInModalClose} />
      <nav>
        <div className='blog'>
          <Link to="/" style={{ textDecoration: "none", color: 'black' }}>
          <span >노래추천사이트</span>
          </Link>
        <Nav className='ml-auto'>
                <Nav.Link>
                  <Button variant="primary" onClick={() => setSignInModalShow(true)}>Sign In</Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="secondary" onClick={() => setSignUpModalShow(true)}>Sign Up</Button>
                </Nav.Link>
                {/* 로그인 회원가입 버튼 */}                
                <Nav.Link>
                  <Link to="/postlist2">
                    <Button variant="primary">게시판</Button>
                  </Link>
                </Nav.Link>        
              </Nav></div>
        
      </nav>
    </div>
  );
}

export default Header;