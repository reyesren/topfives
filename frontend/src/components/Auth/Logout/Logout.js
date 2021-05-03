import React from "react";
import { Button, Container } from "react-bootstrap";
import DisplayModal from "../../DisplayModal/DisplayModal";

const Logout = (props) => {
  const body = (
    <React.Fragment>
      <p>Are you sure you want to logout?</p>
      <div className="logout-buttons-container">
        <div>
          <Button
            onClick={(event, toLogout) => props.closeHandler(event, false)}
            variant="danger"
          >
            Cancel
          </Button>
        </div>

        <div>
          <Button
            onClick={(event, toLogout) => props.closeHandler(event, true)}
            variant="success"
          >
            Logout
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
  // const footer = (
  //   <div className="logout-buttons-container">
  // <Button
  //   onClick={(event, toLogout) => props.closeHandler(event, false)}
  //   variant="danger"
  // >
  //   Cancel
  // </Button>

  // <Button
  //   onClick={(event, toLogout) => props.closeHandler(event, true)}
  //   variant="success"
  // >
  //   Logout
  // </Button>
  //   </div>
  // );
  const styles = {
    title: "logout-title",
    body: "logout-body",
    footer: "logout-footer",
  };

  return (
    <DisplayModal
      show={props.show}
      closeHandler={props.closeHandler}
      body={body}
      // footer={footer}
      styles={styles}
    ></DisplayModal>
  );
};

export default Logout;
