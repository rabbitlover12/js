import React, { useState } from 'react'
import { Modal,Button,Form } from 'react-bootstrap'


const SignUpModal = ({ show, onHide }) => {  
  const [newId, setNewId] = useState('');
  const [newPw, setNewPw] = useState('');

  const handleCheckDuplicate = () => {
    if (newId) {
      fetch(`http://localhost:3003/api/check-duplicate/${newId}`)
        .then(response => response.json())
        .then(data => {
          if (data.exists) {
            alert('이미 사용 중인 아이디입니다.');
          } else {
            alert('사용 가능한 아이디입니다.');
          }
        })
        .catch(error => {
          console.error('오류:', error);
          alert('중복 아이디 확인 중 오류가 발생했습니다.');
        });
    } else {
      alert('아이디를 입력해주세요.');
    }
  };

  const handleSignup = () => {
    if (newId && newPw) {
      fetch('http://localhost:3003/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newId, pw: newPw }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('회원가입이 성공적으로 완료되었습니다.');
            onHide();
          } else {
            alert('회원가입 중 오류가 발생했습니다.');
          }
        })
        .catch(error => {
          console.error('오류:', error);
          alert('회원가입 중 오류가 발생했습니다.');
        });
    } else {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
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

        <Form.Group className="mb-3" controlId="formBasicNickname">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="ID" style={{width:'50%'}} placeholder="아이디를 입력해주세요." onChange={e => setNewId(e.target.value)} />
            
                <Button block={true.toString()} variant="dark" style={{marginTop:'10px'}} type="button" onClick={handleCheckDuplicate}>
                중복 확인
                </Button>
        </Form.Group>
        
        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>닉네임</Form.Label>
            <Form.Control type="email" placeholder="닉네임을 입력해주세요." />
                <Button block={true.toString()} variant="dark" style={{marginTop:'10px'}} type="button">
                중복 확인
                </Button>
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일을 입력해주세요." />
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 한번 더 입력해주세요." />
        </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={handleSignup}>
            Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignUpModal;