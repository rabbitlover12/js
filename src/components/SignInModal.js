import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInModal = ({ show, onHide }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [nickname, setNickName] = useState('');

  

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 로그인 상태를 확인하고 로그인 모달을 열거나 닫음
  useEffect(() => {
    if (isLoggedIn) {
      onHide();
    }
  }, [isLoggedIn, onHide]);

  const handleSignIn = () => {
    // 유효성 검사를 수행
    if (!id || !password) {
      setMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    axios
      .post('http://localhost:3003/api/signin', { id, pw: password })
      .then((response) => {
        const data = response.data;
        if (data.loginSuccess) {
          localStorage.setItem('isLoggedIn', 'true');
          onHide();

          // 로그인 성공 후의 동작 추가 (예: 다른 페이지로 이동)
           // 예시: 로그인 후 프로필 페이지로 이동
        } else {
          setMessage('아이디 및 비밀번호를 잘못 입력했습니다.');
        }
      })
      .catch((error) => {
        console.error('로그인 오류:', error);
        setMessage('로그인 중 오류가 발생했습니다.');
      });
  };

  return (
    <Modal
      show={show}  
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        {message && <p className="text-danger">{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={handleSignIn}>
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignInModal;
