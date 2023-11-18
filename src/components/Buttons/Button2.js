import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Answer2 from '../Answers/Answer2';

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
        ANSWER 2: Grade in prelims = 75
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Answer2 />
      </Modal.Body>
    </Modal>
  );
}

export default function Button2() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='btn-lg' variant="primary" onClick={() => setModalShow(true)}>
        2
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}