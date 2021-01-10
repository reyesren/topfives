import React, { useState } from "react";
import DisplayModal from "../DisplayModal/DisplayModal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AuthForm = (props) => {
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
        {!formEl.config.isValid ? (
          <div className="text-danger">{props.errors[formEl.id]}</div>
        ) : null}
      </Form.Group>
    );
    return returnEl;
  });

  const formBody = (
    <Form noValidate onSubmit={props.submit}>
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
  );

  return (
    <DisplayModal
      body={formBody}
      title={props.title}
      type={props.type}
      closeHandler={props.closeHandler}
    ></DisplayModal>
  );
};

export default AuthForm;
