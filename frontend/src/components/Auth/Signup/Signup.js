import React, { useState } from "react";
import DisplayModal from "../../UI/DisplayModal/DisplayModal";

const Signup = (props) => {
  const formTitle = "Create a New Account";
  const [errors, setErrors] = useState({});
  const [inputConfigs, setInputConfigs] = useState({
    fName: {
      label: "Full Name",
      placeholder: "First Name",
      type: "",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "This cannot be empty!",
      isEmpty: true,
      isValid: true,
    },
    lName: {
      label: "",
      placeholder: "Last Name",
      type: "",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "This cannot be empty!",
      isEmpty: true,
      isValid: true,
    },
    username: {
      label: "Username and Email",
      placeholder: "Username",
      type: "",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "Please choose a username.",
      isEmpty: true,
      isValid: true,
    },
    email: {
      label: "",
      placeholder: "Email",
      type: "email",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "Please provide a valid email.",
      isEmpty: true,
      isValid: true,
    },
    password: {
      label: "Password",
      placeholder: "Password",
      type: "password",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "Please provide a password.",
      isEmpty: true,
      isValid: true,
    },
    confirmPassword: {
      label: "",
      placeholder: "Confirm Password",
      type: "password",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "Please confirm your password.",
      isEmpty: true,
      isValid: true,
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

  const validateInputs = () => {
    let inputErrors = {};
    let valid = true;

    if (!inputConfigs.fName.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        fName: inputConfigs.fName.errorMsg,
      };
      let fNameConfig = {
        ...inputConfigs,
        fName: {
          ...inputConfigs.fName,
          isValid: false,
        },
      };
      setInputConfigs(fNameConfig);
    }
    if (!inputConfigs.lName.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        lName: inputConfigs.lName.errorMsg,
      };
      const newConfig = {
        ...inputConfigs,
        lName: {
          ...inputConfigs.lName,
          isValid: valid,
        },
      };
      setInputConfigs(newConfig);
    }
    if (!inputConfigs.username.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        username: inputConfigs.username.errorMsg,
      };
      const newConfig = {
        ...inputConfigs,
        username: {
          ...inputConfigs.username,
          isValid: valid,
        },
      };
      setInputConfigs(newConfig);
    }
    if (!inputConfigs.email.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        email: inputConfigs.email.errorMsg,
      };
      const newConfig = {
        ...inputConfigs,
        email: {
          ...inputConfigs.email,
          isValid: valid,
        },
      };
      setInputConfigs(newConfig);
    }
    if (!inputConfigs.password.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        password: inputConfigs.password.errorMsg,
      };
      const newConfig = {
        ...inputConfigs,
        password: {
          ...inputConfigs.password,
          isValid: valid,
        },
      };
      setInputConfigs(newConfig);
    }
    if (!inputConfigs.confirmPassword.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        confirmPassword: inputConfigs.confirmPassword.errorMsg,
      };
      const newConfig = {
        ...inputConfigs,
        confirmPassword: {
          ...inputConfigs.confirmPassword,
          isValid: valid,
        },
      };
      setInputConfigs(newConfig);
    }
    setErrors(inputErrors);
    return valid;
  };

  return (
    <DisplayModal
      closeSignupHandler={props.closeSignupHandler}
      type="signup"
      config={inputConfigs}
      title={formTitle}
      passwordCheck={checkIfPasswordsSame}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
    ></DisplayModal>
  );
};

export default Signup;
