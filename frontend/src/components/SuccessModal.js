import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = () => {
  return (
    <Modal className="my-modal" show={true} centered>
      <Modal.Header className="success-header">
        Welcome To TopFives!
      </Modal.Header>
      <Modal.Body className="success-body">
        <p>Your Account Has Been Created.</p>
      </Modal.Body>
      <Modal.Footer className="success-footer">
        <Button variant="success">Enter TopFives</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
