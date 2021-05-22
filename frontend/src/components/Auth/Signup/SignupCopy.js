import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

const SignupCopy = (props) => {
  return (
    <Modal centered show={props.show} onHide={props.closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={props.closeHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupCopy;
