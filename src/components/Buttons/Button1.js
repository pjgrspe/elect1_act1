import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Answer1 from '../Answers/Answer1';

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ANSWER 1: Grade in finals = 82.6
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Answer1 />
      </Modal.Body>
    </Modal>
  );
}

export default function Button1() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='btn-lg' variant="primary" onClick={() => setModalShow(true)}>
        1
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}