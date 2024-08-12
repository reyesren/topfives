import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editList } from "../../../store/actions/list";

const ListEditMode = (props) => {
  const saveFormDebounceRef = useRef(null);
  const dispatch = useDispatch();

  const showList = useSelector((state) => {
    return state.showList;
  });

  const formik = useFormik({
    initialValues: {
      title: showList?.list.listTitle || "",
      description: showList?.list.description || "",
      category: showList?.list.category || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field is required"),
      description: Yup.string(),
      category: Yup.string().required("This field is required"),
    }),
  });

  const changeHandler = (event, fieldName) => {
    formik.handleChange(event);
    if (Object.keys(formik.errors).length < 1) {
      if (saveFormDebounceRef.current) {
        clearTimeout(saveFormDebounceRef.current);
        saveFormDebounceRef.current = null;
      }
      saveFormDebounceRef.current = setTimeout(() => {
        const listValues = {
          title:
            fieldName === "title" ? event.target.value : formik.values.title,
          description:
            fieldName === "description"
              ? event.target.value
              : formik.values.description,
          category:
            fieldName === "category"
              ? event.target.value
              : formik.values.category,
        };
        dispatch(
          editList(listValues.title, listValues.category, [], showList.list._id)
        );
      }, 3000);
    }
  };

  return (
    <>
      <h1>{showList.list.listTitle}</h1>
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
                  onChange={(e) => changeHandler(e, "category")}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                />
                {formik.touched.category && formik.errors.category ? (
                  <div className="error-mssg">{formik.errors.category}</div>
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
              {showList.list && showList.list.entries.length < 1 && (
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
          {/* {listEntryCreationModal} */}
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
