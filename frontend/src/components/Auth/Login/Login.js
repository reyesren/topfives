import React, { useState, useContext } from "react";
import ReusableForm from "../../ReusableForm/ReusableForm";
import Spinner from "react-bootstrap/Spinner";
import DisplayModal from "../../DisplayModal/DisplayModal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";
import SocketContext from "../../../context/socketContext";

const Login = (props) => {
  const socket = useContext(SocketContext).socket;
  const [errors, setErrors] = useState({});
  const [openError, setOpenError] = useState(true);
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
  const formLayout = ["username", "password"];

  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.auth.loading;
  });
  const submitError = useSelector((state) => {
    return state.auth.submitError;
  });

  const onLogin = (username, password, isSignup, closeHandler) => {
    dispatch(
      actions.auth(
        username,
        password,
        isSignup,
        closeHandler,
        null,
        null,
        null,
        null,
        null,
        socket
      )
    );
  };
  const onLoginGoBackToForm = () => {
    dispatch(actions.authGoBackToForm());
  };
  const onLoginStart = () => {
    dispatch(actions.authStart());
  };
  const onLoginFail = () => {
    dispatch(actions.authFail());
  };

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
    if (!valid) {
      onLoginFail();
    }
    return valid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLoginStart();
    if (validateInputs()) {
      onLogin(
        loginForm.username.value,
        loginForm.password.value,
        false,
        props.closeHandler
      );
    }
  };

  let modalBody = (
    <ReusableForm
      closeHandler={props.closeHandler}
      show={props.show}
      type="login"
      config={loginForm}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
      layout={formLayout}
    />
  );
  if (loading) {
    modalBody = <Spinner animation="border" role="status"></Spinner>;
  } else if (submitError) {
    const styles = {
      title: "signup-error-title",
      body: "signup-error-body",
    };
    const errorBody = (
      <div>
        <div>{submitError}</div>
        <Button
          className="float-right signup-error-button"
          variant="primary"
          type="submit"
          onClick={onLoginGoBackToForm}
        >
          Go back
        </Button>
      </div>
    );

    modalBody = (
      <DisplayModal
        title={"Error!"}
        body={errorBody}
        closeHandler={() => setOpenError(false)}
        show={openError}
        styles={styles}
      ></DisplayModal>
    );
  }

  return modalBody;
};

export default Login;
