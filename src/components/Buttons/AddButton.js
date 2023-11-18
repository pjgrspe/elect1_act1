import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import CreateUserModal from '../Modals/CreateUserModal';

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
          ADD STUDENT INFO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateUserModal onClose={props.onHide}/>
      </Modal.Body>
    </Modal>
  );
}

export default function AddUserButton() {
  const [modalShow, setModalShow] = React.useState(false);

  const handleCloseModal = () => {
    // Close the modal
    setModalShow(false);

    // Reload the page
    window.location.reload();
  };

  return (
    <>
      <Button className='btn-lg' variant="success" onClick={() => setModalShow(true)}>
        Add Student
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={handleCloseModal}
      />
    </>
  );
}