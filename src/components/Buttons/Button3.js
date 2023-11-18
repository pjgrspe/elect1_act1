import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Answer3 from '../Answers/Answer3';

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
        ANSWER 3: Ordered by final grade, first name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Answer3 />
      </Modal.Body>
    </Modal>
  );
}

export default function Button3() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='btn-lg' variant="primary" onClick={() => setModalShow(true)}>
        3
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}