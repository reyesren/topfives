import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

const DisplayModal = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.closeHandler();
  };

  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        className={props.styles ? props.styles.title : null}
      >
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={props.styles ? props.styles.body : null}>
        {props.body}
      </Modal.Body>
      {props.footer ? (
        <Modal.Footer className={props.styles ? props.styles.footer : null}>
          {props.footer}
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default DisplayModal;
