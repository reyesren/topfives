import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import DisplayModal from "../../DisplayModal/DisplayModal";

const Logout = (props) => {
  const body = <p>Are you sure you want to logout?</p>;
  const footer = (
    <Fragment>
      <div className="float-left">
        <Button
          onClick={(event, toLogout) => props.closeHandler(event, false)}
          variant="danger"
        >
          Cancel
        </Button>
      </div>

      <Button
        onClick={(event, toLogout) => props.closeHandler(event, true)}
        variant="success"
      >
        Logout
      </Button>
    </Fragment>
  );
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
      //   title={title}
      footer={footer}
      styles={styles}
    ></DisplayModal>
  );
};

export default Logout;
