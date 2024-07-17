import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../../store/actions/list";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

const ListCreationModal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userInfo);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: ({ title, description }, { resetForm }) => {
      dispatch(createList(title, description)).then(({ payload }) => {
        if (payload) {
          resetForm();
          props.closeHandler();
          history.push(`/user/${user._id}`);
        }
      });
    },
  });

  return (
    <>
      <Modal
        className="topfives-modal"
        show={props.show}
        onHide={props.closeHandler}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Container>
              <Form.Group>
                <Form.Label>List Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </Form.Group>
              <Form.Group className="modal-group">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  rows="3"
                  as="textarea"
                  placeholder="Enter title"
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
              </Form.Group>
              <div className="modal-group modal-button-group">
                <Button variant="secondary" onClick={props.closeHandler}>
                  Cancel
                </Button>
                <Button variant="success" type="submit">
                  Create List
                </Button>
              </div>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListCreationModal;
