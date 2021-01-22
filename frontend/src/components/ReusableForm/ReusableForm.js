import React from "react";
import DisplayModal from "../DisplayModal/DisplayModal";
import { Button, Container, Form, Col } from "react-bootstrap";

const ReusableForm = (props) => {
  let formFields = props.layout.map((formEl) => {
    let returnEl;
    if (Array.isArray(formEl)) {
      let elemInRow;
      let rowEl = [];
      for (let i = 0; i < formEl.length; i++) {
        const id = formEl[i];
        const config = props.config[id];

        elemInRow = (
          <Col lg={12 / formEl.length}>
            <Form.Group>
              {config.label ? <Form.Label>{config.label}</Form.Label> : null}
              <Form.Control
                type={config.type}
                placeholder={config.placeholder}
                required
                value={config.value}
                onChange={(event) => props.changed(event, id)}
                as={config.as}
                rows={5}
              ></Form.Control>
              {!config.isValid ? (
                <div className="text-danger">{props.errors[id]}</div>
              ) : null}
            </Form.Group>
          </Col>
        );
        rowEl.push(elemInRow);
      }
      returnEl = <Form.Row>{rowEl}</Form.Row>;
    } else {
      const id = formEl;
      const config = props.config[id];
      returnEl = (
        <Form.Group key={id}>
          {config.label ? <Form.Label>{config.label}</Form.Label> : null}
          <Form.Control
            type={config.type}
            placeholder={config.placeholder}
            required
            value={config.value}
            onChange={(event) => props.changed(event, id)}
            as={config.as}
            rows={5}
          ></Form.Control>
          {!config.isValid ? (
            <div className="text-danger">{props.errors[id]}</div>
          ) : null}
        </Form.Group>
      );
    }
    return returnEl;
  });

  const formBody = (
    <Form noValidate onSubmit={props.submit}>
      <Container>
        {formFields}
        <Button variant="danger" onClick={props.closeHandler}>
          Cancel
        </Button>
        <Button className="float-right" variant="success" type="submit">
          {props.type === "login" && "Log In"}
          {props.type === "signup" && "Sign Up"}
          {props.type === "edit" && "Submit Changes"}
        </Button>
      </Container>
    </Form>
  );

  return (
    <DisplayModal
      body={formBody}
      title={props.title}
      closeHandler={props.closeHandler}
      show={props.show}
    ></DisplayModal>
  );
};

export default ReusableForm;
