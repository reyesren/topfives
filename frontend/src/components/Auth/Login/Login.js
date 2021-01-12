import React, { useState } from "react";
import AuthForm from "../../AuthForm/AuthForm";
import Spinner from "react-bootstrap/Spinner";
import DisplayModal from "../../DisplayModal/DisplayModal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

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
    props.onLoginStart();
    if (validateInputs()) {
      props.onLogin(loginForm.username.value, loginForm.password.value);
    }
  };

  let modalBody = (
    <AuthForm
      closeHandler={props.closeLoginHandler}
      type="login"
      config={loginForm}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
    />
  );
  if (props.loading) {
    modalBody = <Spinner animation="border" role="status"></Spinner>;
  } else if (props.submitError) {
    console.log(props.submitError);
    const styles = {
      title: "signup-error-title",
      body: "signup-error-body",
    };
    const errorBody = (
      <div>
        <div>{props.submitError}</div>
        <Button
          className="float-right signup-error-button"
          variant="primary"
          type="submit"
          onClick={props.onLoginGoBackToForm}
        >
          Go back
        </Button>
      </div>
    );

    modalBody = (
      <DisplayModal
        title={"Error!"}
        body={errorBody}
        closeHandler={props.closeLoginHandler}
        styles={styles}
      ></DisplayModal>
    );
  }

  return modalBody;
};

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    submitError: state.login.submitError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) =>
      dispatch(actions.login(username, password)),
    onLoginGoBackToForm: () => dispatch(actions.loginGoBackToForm()),
    onLoginStart: () => dispatch(actions.loginStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
