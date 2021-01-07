import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./DisplayModal.css";

const DisplayModal = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const formElementsArray = [];
  for (let key in props.config.formInputs) {
    formElementsArray.push({
      id: key,
      config: props.config.formInputs[key],
    });
  }

  let formFields = formElementsArray.map((formEl) => {
    let returnEl = (
      <Form.Group key={formEl.config.placeholder}>
        {formEl.config.label ? (
          <Form.Label>{formEl.config.label}</Form.Label>
        ) : null}
        <Form.Control placeholder={formEl.config.placeholder}></Form.Control>
      </Form.Group>
    );
    return returnEl;
  });

  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.config.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {formFields}
          <Button
            className="float-right"
            variant="success"
            onClick={handleClose}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DisplayModal;
