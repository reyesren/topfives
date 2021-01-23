import React from "react";
import { Button, Container } from "react-bootstrap";
import DisplayModal from "../../DisplayModal/DisplayModal";

const Logout = (props) => {
  const body = <p>Are you sure you want to logout?</p>;
  const footer = (
    <Container>
      <Button
        onClick={(event, toLogout) => props.closeHandler(event, false)}
        variant="danger"
      >
        Cancel
      </Button>

      <Button
        onClick={(event, toLogout) => props.closeHandler(event, true)}
        variant="success"
        className="float-right"
      >
        Logout
      </Button>
    </Container>
  );
  const styles = {
    title: "logout-title",
    body: "logout-body",
    footer: "logout-footer",
  };
  // const title = "Are you sure you want ot";

  return (
    <DisplayModal
      show={props.show}
      closeHandler={props.closeHandler}
      body={body}
      // title={title}
      footer={footer}
      styles={styles}
    ></DisplayModal>
  );
};

export default Logout;
