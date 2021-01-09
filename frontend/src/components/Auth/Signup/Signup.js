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
      errorMsg: "Your first name cannot be empty!",
      isEmpty: true,
      isValid: true,
    },
    lName: {
      label: "",
      placeholder: "Last Name",
      type: "",
      value: "",
      emptyFieldMsg: "",
      errorMsg: "Your last name cannot be empty!",
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
      label: "Password / Confirm Password",
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

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

    let newConfig = {
      ...inputConfigs,
      fName: {
        ...inputConfigs.fName,
      },
      lName: {
        ...inputConfigs.lName,
      },
      username: {
        ...inputConfigs.username,
      },
      email: {
        ...inputConfigs.email,
      },
      password: {
        ...inputConfigs.password,
      },
      confirmPassword: {
        ...inputConfigs.confirmPassword,
      },
    };

    if (!inputConfigs.fName.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        fName: inputConfigs.fName.errorMsg,
      };
      newConfig = {
        ...newConfig,
        fName: {
          ...newConfig.fName,
          isValid: false,
        },
      };
    }
    if (!inputConfigs.lName.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        lName: inputConfigs.lName.errorMsg,
      };
      newConfig = {
        ...newConfig,
        lName: {
          ...newConfig.lName,
          isValid: false,
        },
      };
    }
    if (!inputConfigs.username.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        username: inputConfigs.username.errorMsg,
      };
      newConfig = {
        ...newConfig,
        username: {
          ...newConfig.username,
          isValid: false,
        },
      };
    }
    if (!inputConfigs.email.value || !validateEmail(inputConfigs.email.value)) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        email: inputConfigs.email.errorMsg,
      };
      newConfig = {
        ...newConfig,
        email: {
          ...newConfig.email,
          isValid: false,
        },
      };
    }
    if (inputConfigs.password.value !== inputConfigs.confirmPassword.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        confirmPassword: "Your passwords don't match!",
      };
      newConfig = {
        ...newConfig,
        confirmPassword: {
          ...newConfig.confirmPassword,
          isValid: false,
        },
      };
    }
    if (!inputConfigs.password.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        password: inputConfigs.password.errorMsg,
      };
      newConfig = {
        ...newConfig,
        password: {
          ...newConfig.password,
          isValid: false,
        },
      };
    }
    if (!inputConfigs.confirmPassword.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        confirmPassword: inputConfigs.confirmPassword.errorMsg,
      };
      newConfig = {
        ...newConfig,
        confirmPassword: {
          ...newConfig.confirmPassword,
          isValid: false,
        },
      };
    }

    setErrors(inputErrors);
    setInputConfigs(newConfig);
    return valid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      return;
    }
  };

  return (
    <DisplayModal
      closeSignupHandler={props.closeSignupHandler}
      type="signup"
      config={inputConfigs}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
    ></DisplayModal>
  );
};

export default Signup;
