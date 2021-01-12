import React from "react";

import Modal from "react-bootstrap/Modal";

const DisplayModal = (props) => {
  const handleClose = () => {
<<<<<<< HEAD
    props.closeHandler();
  };
  return (
    <Modal className="my-modal" show={props.show} onHide={handleClose} centered>
=======
    setShow(false);
    props.closeHandler();
  };
  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
>>>>>>> TOP19
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
