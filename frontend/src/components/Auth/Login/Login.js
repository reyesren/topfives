import React, { useState } from "react";
import AuthForm from "../../AuthForm/AuthForm";

const Login = (props) => {
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    username: {
      label: "Username",
      placeholder: "Enter username",
      type: "text",
      value: "",
      errorMsg: "Your username cannot be empty!",
      isValid: true,
    },
    password: {
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      value: "",
      errorMsg: "Please provide a password.",
      isValid: true,
    },
  });
  const formTitle = "Login To Existing Account";

  const inputChangedHandler = (event, inputEl) => {
    const updatedLoginForm = {
      ...loginForm,
      [inputEl]: {
        ...loginForm[inputEl],
        value: event.target.value,
      },
    };
    setLoginForm(updatedLoginForm);
  };

  const validateInputs = () => {
    let inputErrors = {};
    let valid = true;

    let newConfig = {
      ...loginForm,
      username: {
        ...loginForm.username,
      },
      password: {
        ...loginForm.password,
      },
    };
    if (!loginForm.username.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        username: loginForm.username.errorMsg,
      };
      newConfig = {
        ...newConfig,
        username: {
          ...newConfig.username,
          isValid: false,
        },
      };
    }

    if (loginForm.password.value.length < 6) {
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
    if (!loginForm.password.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        password: loginForm.password.errorMsg,
      };
      newConfig = {
        ...newConfig,
        password: {
          ...newConfig.password,
          isValid: false,
        },
      };
    }
    setErrors(inputErrors);
    setLoginForm(newConfig);
    return valid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      return;
    }
  };

  return (
    <AuthForm
      closeHandler={props.closeHandler}
      show={props.show}
      type="login"
      config={loginForm}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
    />
  );
};

export default Login;
