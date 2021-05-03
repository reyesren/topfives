import React, { useEffect } from "react";
import DisplayModal from "../DisplayModal/DisplayModal";
import { Button, Container, Form, Col, Image } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

const ReusableForm = (props) => {
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  let formFields = props.layout.map((formEl) => {
    let returnEl;
    if (Array.isArray(formEl)) {
      let elemInRow;
      let rowEl = [];
      for (let i = 0; i < formEl.length; i++) {
        const id = formEl[i];
        const config = props.config[id];
        elemInRow = (
          <Col lg={12 / formEl.length} key={id}>
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
      returnEl = <Form.Row key={formEl}>{rowEl}</Form.Row>;
    } else if (formEl === "image") {
      const config = props.config[formEl];
      returnEl = (
        <Form.Row className={"imageRow"} key={formEl}>
          <Col lg={9}>
            <Form.File label={config.label} custom className={"imageField"} />
          </Col>
          <Col lg={3}>
            <Image src={config.value} className={"imagePreview"} />
          </Col>
        </Form.Row>
      );
    } else {
      const id = formEl;
      const config = props.config[id];
      returnEl = (
        <Form.Group key={id}>
          {config.label ? <Form.Label>{config.label}</Form.Label> : null}
          {config.type === "rankswap" ? (
            config.options.map((option, index) => (
              <React.Fragment key={index}>
                <Form.Label>{`${option.label}'s rank`}</Form.Label>
                <Form.Control
                  type={option.type}
                  placeholder={option.placeholder}
                  required
                  value={option.value}
                  onChange={(event) => props.changed(event, id, option.label)}
                  as={config.as}
                  rows={5}
                ></Form.Control>
              </React.Fragment>
            ))
          ) : (
            <Form.Control
              type={config.type}
              placeholder={config.placeholder}
              required
              value={config.value}
              onChange={(event) => props.changed(event, id)}
              as={config.as}
              rows={5}
            ></Form.Control>
          )}

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
        <div className="reusable-form-btn-container">
          <Button variant="danger" onClick={props.closeHandler}>
            Cancel
          </Button>
          <Button className="float-right" variant="success" type="submit">
            {props.type === "login" && "Log In"}
            {props.type === "signup" && "Sign Up"}
            {props.type === "edit" && "Submit Changes"}
          </Button>
        </div>
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
