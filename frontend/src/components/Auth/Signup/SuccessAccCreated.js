import React from "react";
import { Button } from "react-bootstrap";
import DisplayModal from "../../DisplayModal/DisplayModal";

const SuccessAccCreated = () => {
  const body = <p>Your account has been created.</p>;
  const title = "Welcome to TopFives!";
  const footer = <Button variant="success">Enter TopFives</Button>;
  const styles = {
    title: "success-header",
    body: "success-body",
    footer: "success-footer",
  };

  return (
    <DisplayModal
      body={body}
      title={title}
      footer={footer}
      styles={styles}
    ></DisplayModal>
  );
};

export default SuccessAccCreated;
