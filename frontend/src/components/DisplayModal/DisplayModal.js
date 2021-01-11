import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";

const DisplayModal = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    // setShow(false);
    props.showForm = false;
    // props.closeHandler();
  };
  console.log(props.showForm);
  return (
    <Modal
      className="my-modal"
      show={props.showForm}
      onHide={handleClose}
      centered
    >
      <Modal.Header
        className={props.styles ? props.styles.title : null}
        closeButton={props.styles ? false : true}
      >
        <Modal.Title className={props.styles ? props.styles.title : null}>
          {props.title}
        </Modal.Title>
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
