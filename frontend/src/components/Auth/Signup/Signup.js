import React, { useState } from "react";
import AuthForm from "../../AuthForm/AuthForm";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import SuccessAccCreated from "./SuccessAccCreated";

const Signup = (props) => {
  const formTitle = "Create a New Account";
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inputConfigs, setInputConfigs] = useState({
    fName: {
      label: "Full Name",
      placeholder: "First Name",
      type: "",
      value: "",
      errorMsg: "Your first name cannot be empty!",
      isValid: true,
    },
    lName: {
      label: "",
      placeholder: "Last Name",
      type: "",
      value: "",
      errorMsg: "Your last name cannot be empty!",
      isValid: true,
    },
    username: {
      label: "Username and Email",
      placeholder: "Username",
      type: "",
      value: "",
      errorMsg: "Please choose a username.",
      isValid: true,
    },
    email: {
      label: "",
      placeholder: "Email",
      type: "email",
      value: "",
      errorMsg: "Please provide a valid email.",
      isValid: true,
    },
    password: {
      label: "Password / Confirm Password",
      placeholder: "Password",
      type: "password",
      value: "",
      errorMsg: "Please provide a password.",
      isValid: true,
    },
    confirmPassword: {
      label: "",
      placeholder: "Confirm Password",
      type: "password",
      value: "",
      errorMsg: "Please confirm your password.",
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
    if (inputConfigs.password.value.length < 6) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        password: "Your password must be at least 6 characters long.",
      };
      newConfig = {
        ...newConfig,
        password: {
          ...newConfig.password,
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
    setIsLoading(true);
    if (validateInputs()) {
      const reqBody = {
        name: inputConfigs.fName.value + " " + inputConfigs.lName.value,
        username: inputConfigs.username.value,
        password: inputConfigs.password.value,
        email: inputConfigs.email.value,
        subscriptions: [],
        lists: [],
      };
      axios
        .post("http://localhost:5000/api/users/signup", reqBody)
        .then((response) => {
          setIsLoading(false);
          setSubmitting(true);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log(props.show);
  let modalBody = (
    <AuthForm
      closeHandler={props.closeSignupHandler}
      type="signup"
      config={inputConfigs}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
      showForm={props.show}
    ></AuthForm>
  );
  if (isLoading && !submitting) {
    modalBody = <Spinner animation="border" role="status"></Spinner>;
  } else if (submitting) {
    modalBody = <SuccessAccCreated></SuccessAccCreated>;
  }

  return modalBody;
};

export default Signup;
