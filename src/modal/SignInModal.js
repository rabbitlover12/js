import React from 'react'
import { Modal,Button,Form } from 'react-bootstrap'


const SignInModal = ({ show, onHide }) => {
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
            <Form.Control type="email" placeholder="아이디를 입력해주세요." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력해주세요." />
        </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button">
            Sign In
        </Button>
      

      </Modal.Footer>
    </Modal>
  )
}

export default SignInModal