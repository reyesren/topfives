import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./DisplayModal.css";

const DisplayModal = (props) => {
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const handleClose = () => {
    setShow(false);
    props.type === "login"
      ? props.closeLoginHandler()
      : props.closeSignupHandler();
  };

  const formElementsArray = [];
  for (let key in props.config) {
    formElementsArray.push({
      id: key,
      config: props.config[key],
    });
  }

  let formFields = formElementsArray.map((formEl) => {
    let returnEl = (
      <Form.Group key={formEl.id}>
        {formEl.config.label ? (
          <Form.Label>{formEl.config.label}</Form.Label>
        ) : null}
        <Form.Control
          type={formEl.config.type}
          placeholder={formEl.config.placeholder}
          required
          value={formEl.config.value}
          onChange={(event) => props.changed(event, formEl.config)}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {formEl.config.emptyFieldMsg}
        </Form.Control.Feedback>
      </Form.Group>
    );
    return returnEl;
  });

  const submitHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          {formFields}
          <Button
            className="float-right"
            variant="success"
            type="submit"
            // onClick={handleClose}
          >
            {props.type === "login" && "Log In"}
            {props.type === "signup" && "Sign Up"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DisplayModal;
