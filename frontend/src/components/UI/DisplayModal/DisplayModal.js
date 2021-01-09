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
          onChange={(event) => props.changed(event, formEl.id)}
        ></Form.Control>
        {console.log(formEl.config.isValid)}
        {formEl.config.isValid ? (
          <Form.Control.Feedback type="invalid">
            {props.errors[formEl.id]}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
    );
    return returnEl;
  });

  const submitHandler = (event) => {
    event.preventDefault();
    if (props.validate()) {
      return;
    }
    // setValidated(true);
  };

  return (
    <Modal className="my-modal" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={submitHandler}>
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
