import React, { useState } from "react";
import SignupCopy from "./SignupCopy";

const SignupContainer = (props) => {
  const [errors, setErrors] = useState({});
  const [config, setConfig] = useState({
    fName: {
      label: "First Name",
      placeholder: "First Name",
      type: "",
      value: "",
    },
    lName: {
      label: "Last Name",
      placeholder: "Last Name",
      type: "",
      value: "",
    },
    username: {
      label: "Username and Email",
      placeholder: "Username",
      type: "",
      value: "",
    },
    email: {
      label: "",
      placeholder: "Email",
      type: "email",
      value: "",
    },
    password: {
      label: "Password / Confirm Password",
      placeholder: "Password",
      type: "password",
      value: "",
    },
    confirmPassword: {
      label: "",
      placeholder: "Confirm Password",
      type: "password",
      value: "",
    },
  });

  return (
    <SignupCopy
      show={props.show}
      closeHandler={props.closeHandler}
    ></SignupCopy>
  );
};

export default SignupContainer;
