import React, { useState } from "react";
import DisplayModal from "../../UI/DisplayModal/DisplayModal";

const Signup = (props) => {
  const formTitle = "Create a New Account";

  const [inputConfigs, setInputConfigs] = useState({
    fName: {
      label: "Full Name",
      placeholder: "First Name",
      type: "",
      value: "",
      emptyFieldMsg: "This cannot be empty!",
      errorMsg: "",
      isEmpty: true,
    },
    lName: {
      label: "",
      placeholder: "Last Name",
      type: "",
      value: "",
      emptyFieldMsg: "This cannot be empty!",
      errorMsg: "",
      isEmpty: true,
    },
    username: {
      label: "Username and Email",
      placeholder: "Username",
      type: "",
      value: "",
      emptyFieldMsg: "Please choose a username.",
      errorMsg: "This username is taken.",
      isEmpty: true,
    },
    email: {
      label: "",
      placeholder: "Email",
      type: "email",
      value: "",
      emptyFieldMsg: "Please provide a valid email.",
      errorMsg: "",
      isEmpty: true,
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      value: "",
      emptyFieldMsg: "Please provide a password.",
      errorMsg: "",
      isEmpty: true,
    },
    confirmPassword: {
      label: "",
      placeholder: "Confirm Password",
      type: "password",
      value: "",
      emptyFieldMsg: "Please confirm your password.",
      errorMsg: "",
      isEmpty: true,
    },
  });

  const checkIfPasswordsSame = () => {
    return inputConfigs.password.value === inputConfigs.confirmPassword.value;
  };

  const inputChangedHandler = (event, inputEl) => {
    const updatedInputs = {
      ...inputConfigs,
      [inputEl]: {
        ...inputConfigs[inputEl],
        value: event.target.value,
      },
    };

    setInputConfigs(updatedInputs);
  };

  return (
    <DisplayModal
      closeSignupHandler={props.closeSignupHandler}
      type="signup"
      config={inputConfigs}
      title={formTitle}
      passwordCheck={checkIfPasswordsSame}
      changed={inputChangedHandler}
    ></DisplayModal>
  );
};

export default Signup;
