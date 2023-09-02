import React, { useEffect, useState } from 'react';
import './css/Header.css';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

function Header() {
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [signInModalShow, setSignInModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태 변수
  const nickname = localStorage.getItem('nickname');

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true'){
      setIsLoggedIn(true);
    }
  }, []);



  function handleSignUpModalClose() {
    setSignUpModalShow(false);
  }

  function handleSignInModalClose() {
    setSignInModalShow(false);
  }

  function handleSignOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('nickname');
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <SignUpModal show={signUpModalShow} onHide={handleSignUpModalClose} />
      <SignInModal show={signInModalShow} onHide={() => {
        handleSignInModalClose();
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        if(storedLoggedIn === 'true') {
          setIsLoggedIn(true);
        }
      }} 
      />
      <nav>
        <div className='blog'>
          <Link to="/" style={{ textDecoration: "none", color: 'black' }}>
            <span>노래추천사이트</span>
          </Link>
          <Nav className='ml-auto'>
            {isLoggedIn ? (
              <Nav.Link>
                <Button className="signoutbutton" variant="primary" onClick={() => handleSignOut()}>Sign Out</Button>
                <h1>{nickname}님 환영합니다!</h1>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link>
                  <Button variant="primary" onClick={() => setSignInModalShow(true)}>Sign In</Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="secondary" onClick={() => setSignUpModalShow(true)}>Sign Up</Button>
                </Nav.Link>
              </>
            )}
            <Nav.Link>
              <Link to="/postlist2">
              <Button className="custombutton" variant="primary">
               게시판
              </Button>
              </Link>
            </Nav.Link>
          </Nav>
        </div>
      </nav>
    </div>
  );
}

export default Header;
