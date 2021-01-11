import React from "react";
import { Button } from "react-bootstrap";
import DisplayModal from "../../DisplayModal/DisplayModal";

const SuccessAccCreated = (props) => {
  const body = <p>Your account has been created.</p>;
  const title = "Welcome to TopFives!";
  const footer = (
    <Button onClick={props.closeHandler} variant="success">
      Enter TopFives
    </Button>
  );
  const styles = {
    header: "success-header",
    title: "success-title",
    body: "success-body",
    footer: "success-footer",
  };

  return (
    <DisplayModal
      show={props.show}
      closeHandler={props.closeHandler}
      body={body}
      title={title}
      footer={footer}
      styles={styles}
    ></DisplayModal>
  );
};

export default SuccessAccCreated;
