import React, { useState } from "react";
import AuthForm from "../../AuthForm/AuthForm";
import Spinner from "react-bootstrap/Spinner";
import SuccessAccCreated from "./SuccessAccCreated";
import DisplayModal from "../../DisplayModal/DisplayModal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";

const Signup = (props) => {
  const formTitle = "Create a New Account";
  const [openSuccess, setOpenSuccess] = useState(true);
  const [openError, setOpenError] = useState(true);
  const [errors, setErrors] = useState({});
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

  const dispatch = useDispatch();

  const loading = useSelector((state) => {
    return state.auth.loading;
  });
  const readyToSubmit = useSelector((state) => {
    return state.auth.readyToSubmit;
  });
  const submitError = useSelector((state) => {
    return state.auth.submitError;
  });

  const onSignup = (
    username,
    password,
    isSignup,
    closeHandler,
    firstName,
    lastName,
    email,
    subscriptions,
    lists
  ) => {
    dispatch(
      actions.auth(
        username,
        password,
        isSignup,
        closeHandler,
        firstName,
        lastName,
        email,
        subscriptions,
        lists
      )
    );
  };
  const onLogin = (username, password, isSignup) => {
    dispatch(actions.auth(username, password, isSignup));
  };
  const onAuthGoBackToForm = () => {
    dispatch(actions.authGoBackToForm());
  };
  const onAuthStart = () => {
    dispatch(actions.authStart());
  };
  const onAuthFail = () => {
    dispatch(actions.authFail());
  };

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
    if (!valid) {
      onAuthFail();
    }
    return valid;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    onAuthStart();
    if (validateInputs()) {
      onSignup(
        inputConfigs.username.value,
        inputConfigs.password.value,
        true,
        null,
        inputConfigs.fName.value,
        inputConfigs.lName.value,
        inputConfigs.email.value,
        [],
        []
      );
    }
  };

  let modalBody = (
    <AuthForm
      show={props.show}
      closeHandler={props.closeHandler}
      type="signup"
      config={inputConfigs}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
    ></AuthForm>
  );

  const successfulSignupHandler = () => {
    setOpenSuccess(false);
    onLogin(inputConfigs.username.value, inputConfigs.password.value, false);
  };

  if (loading && !readyToSubmit) {
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
          onClick={onAuthGoBackToForm}
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
        styles={styles}
        show={openError}
      ></DisplayModal>
    );
  } else if (readyToSubmit) {
    modalBody = (
      <SuccessAccCreated
        show={openSuccess}
        closeHandler={successfulSignupHandler}
      ></SuccessAccCreated>
    );
  }

  return modalBody;
};

export default Signup;
