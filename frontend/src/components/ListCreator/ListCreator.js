import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

const ListCreator = (props) => {
  [show] = useState(false);

  const clearListProgress = () => {
    console.log("clearing!");
    props.toggle();
  };
  return (
    <React.Fragment>
      <Modal
        className="my-modal"
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={clearListProgress}
      >
        <Modal.Header closeButton className="modal-rmv-border">
          <Image
            className="list-creator-brand"
            src="/images/logo-title.png"
          ></Image>
        </Modal.Header>
        <Modal.Body className="modal-intro-container">
          <h4>Welcome to the TopFives List Creator!</h4>
          <h4>Let's walk you through creating your own list.</h4>
        </Modal.Body>
        <Modal.Footer className="modal-rmv-border">
          <Button onClick={props.toggle} variant="dark">
            Create List
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ListCreator;
