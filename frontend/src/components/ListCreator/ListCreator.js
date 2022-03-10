import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

const ListCreator = (props) => {
  const [currentView, setCurrentView] = useState(0);

  const modalViewsMapping = {
    INTRO: 0,
    LIST_DETAILS: 1,
    LIST_ITEM_DETAILS: 2,
  };

  const moveToNextModalViewHandler = (currentViewVal) => {
    setCurrentView((currView) => (currView < 2 ? currView + 1 : -1));
  };

  const useModalButtonHandler = () => {
    let btnHandler;
    switch (currentView) {
      case modalViewsMapping.INTRO:
        btnHandler = moveToNextModalViewHandler(currentView);
        break;
      case modalViewsMapping.LIST_DETAILS:
        btnHandler = moveToNextModalViewHandler(currentView);
        break;
      case modalViewsMapping.LIST_ITEM_DETAILS:
        btnHandler = moveToNextModalViewHandler(currentView);
        break;
      default:
        btnHandler = null;
    }
    return btnHandler;
  };

  const getModalHeaderContents = () => {
    let headerContents;
    switch (currentView) {
      case modalViewsMapping.LIST_DETAILS:
        headerContents = (
          <div className="list-details-header-container">
            TopFives' List Configurator
          </div>
        );
        break;
      case modalViewsMapping.LIST_ITEM_DETAILS:
        headerContents = "listItemDetails";
        break;
      default:
        headerContents = null;
    }
    return headerContents;
  };

  const getModalBodyContents = () => {
    let bodyContents;
    switch (currentView) {
      case modalViewsMapping.INTRO:
        bodyContents = (
          <div className="modal-intro-container">
            <h4>Welcome to the TopFives List Creator!</h4>
            <h4>Let's walk you through creating your own list.</h4>
          </div>
        );
        break;
      case modalViewsMapping.LIST_DETAILS:
        bodyContents = (
          <React.Fragment>
            <div className="contents-header">Step 1: List Details</div>
            <div>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={3}>
                  New List Title
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="List Title" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  New List Type
                </Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="List Type" />
                </Col>
              </Form.Group>
            </div>
          </React.Fragment>
        );
        break;
      case modalViewsMapping.LIST_ITEM_DETAILS:
        bodyContents = "listItemDetails";
        break;
      default:
        bodyContents = null;
    }
    return bodyContents;
  };

  const getModalBtnText = () => {
    let btnText;
    switch (currentView) {
      case modalViewsMapping.INTRO:
        btnText = "Create List";
        break;
      case modalViewsMapping.LIST_DETAILS:
        btnText = "Next";
        break;
      case modalViewsMapping.LIST_ITEM_DETAILS:
        btnText = "listItemDetails";
        break;
      default:
        btnText = null;
    }
    return btnText;
  };

  return (
    <React.Fragment>
      <Modal
        className="my-modal"
        show={props.show}
        size="med"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.toggle}
      >
        <Modal.Header closeButton className="modal-rmv-border">
          <Image
            className="list-creator-brand"
            src="/images/logo-title.png"
          ></Image>
          {getModalHeaderContents()}
        </Modal.Header>
        <Modal.Body>{getModalBodyContents()}</Modal.Body>
        <Modal.Footer className="modal-rmv-border">
          <Button onClick={useModalButtonHandler} variant="dark">
            {getModalBtnText()}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ListCreator;
