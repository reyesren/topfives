import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import "./DisplayModal.css";

const DisplayModal = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.type === "login"
      ? props.closeLoginHandler()
      : props.closeSignupHandler();
  };

  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
    </Modal>
  );
};

export default DisplayModal;
