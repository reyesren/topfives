import React, { useState, useEffect, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const ListEditMode = (props) => {
  const [saveFormDebounce, setSaveFormDebounce] = useState(false);

  const showList = useSelector((state) => {
    return state.showList;
  });

  const formik = useFormik({
    initialValues: {
      title: showList?.listTitle || "",
      description: showList?.description || "",
      category: showList?.category || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field is required"),
      description: Yup.string(),
      category: Yup.string().required("This field is required"),
    }),
  });

  const blurHandler = (event, fieldName) => {
    formik.handleBlur(event);
  };

  useEffect(() => {
    if (Object.keys(formik.errors).length < 1) {
      if (saveFormDebounce) {
        setSaveFormDebounce(null);
      }
      const formDebounce = setTimeout(() => {
        console.log("hello world");
      }, 3000);
      setSaveFormDebounce(formDebounce);
    }
  }, [formik.errors]);

  return (
    <>
      <h1>{showList.listTitle}</h1>
      <Container>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
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
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={(e) => blurHandler(e, "category")}
                  value={formik.values.category}
                />
                {formik.touched.category && formik.errors.category ? (
                  <Alert variant="danger">{formik.errors.category} </Alert>
                ) : null}{" "}
              </Form.Group>
            </Col>
          </Row>
          <Row className="edit-row-section">
            <Col>
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
            </Col>
          </Row>
          <Row className="edit-row-section">
            <Col>
              <h2>List Entries</h2>
              {showList && showList.entries.length < 1 && (
                <div className="list-entries-section">
                  <div>Your entries will be displayed here.</div>
                  <div>
                    <Button
                      className="add-entry-btn"
                      variant="success"
                      onClick={props.closeHandler}
                    >
                      Add new entry
                    </Button>
                  </div>
                </div>
              )}
            </Col>
          </Row>
          {/* <div className="modal-group modal-button-group">
            <Button variant="secondary" onClick={props.closeHandler}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Create List
            </Button>
          </div> */}
        </Form>
      </Container>
    </>
  );
};

export default ListEditMode;
