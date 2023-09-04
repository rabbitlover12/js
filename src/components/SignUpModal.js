import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpModal = ({ show, onHide }) => {
  const [newId, setNewId] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  const handleCheckDuplicate = () => {
    if (newId) {
      // 서버에 아이디 중복 확인 요청을 보내는 부분
      axios.get(`http://localhost:3003/api/check-duplicate/${newId}`)
        .then((response) => {
          const data = response.data;
          if (data.exists) {
            alert('이미 사용 중인 아이디입니다.');
          } else {
            alert('사용 가능한 아이디입니다.');
          }
        })
        .catch((error) => {
          console.error('오류:', error);
          alert('중복 아이디 확인 중 오류가 발생했습니다.');
        });
    } else {
      alert('아이디를 입력해주세요.');
    }
  };
  const handleCheckNicknameDuplicate = () => {
    if (newNickname) {
      // 서버에 닉네임 중복 확인 요청을 보내는 부분
      axios.get(`http://localhost:3003/api/check-nickname-duplicate/${newNickname}`)
        .then((response) => {
          const data = response.data;
          if (data.exists) {
            alert('이미 사용 중인 닉네임입니다.');
          } else {
            alert('사용 가능한 닉네임입니다.');
          }
        })
        .catch((error) => {
          console.error('오류:', error);
          alert('중복 닉네임 확인 중 오류가 발생했습니다.');
        });
    } else {
      alert('닉네임을 입력해주세요.');
    }
  };


  const handleSignup = () => {
    if (newId && newPw && newNickname && newEmail) {
      // 서버에 회원가입 요청을 보내는 부분
      axios.post('http://localhost:3003/api/signup', {
        id: newId,
        pw: newPw,
        nickname: newNickname,
        email: newEmail,
      })
        .then((response) => {
          const data = response.data;
          if (data.success) {
            alert('회원가입이 성공적으로 완료되었습니다.');
            onHide();
            navigate('/');
          } else {
            alert('회원가입 중 오류가 발생했습니다.');
          }
        })
        .catch((error) => {
          console.error('오류:', error);
          alert('회원가입 중 오류가 발생했습니다.');
        });
    } else {
      alert('모든 필수 정보를 입력해주세요.');
    }
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
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              style={{ width: '50%' }}
              placeholder="아이디를 입력해주세요."
              onChange={(e) => setNewId(e.target.value)}
            />
            <Button
              block
              variant="dark"
              style={{ marginTop: '10px' }}
              type="button"
              onClick={handleCheckDuplicate}
            >
              중복 확인
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              placeholder="닉네임을 입력해주세요."
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <Button
              block
              variant="dark"
              style={{ marginTop: '10px' }}
              type="button"
              onClick={handleCheckNicknameDuplicate}
            >
              중복 확인
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => setNewPw(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={handleSignup}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
