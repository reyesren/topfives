import React, { useState } from "react";
import AuthForm from "../../AuthForm/AuthForm";
import Spinner from "react-bootstrap/Spinner";
<<<<<<< HEAD
=======
import SuccessAccCreated from "./SuccessAccCreated";
import DisplayModal from "../../DisplayModal/DisplayModal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
>>>>>>> TOP19

const Signup = (props) => {
  const formTitle = "Create a New Account";
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

    props.onSignupStart();
    if (validateInputs()) {
<<<<<<< HEAD
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
          props.closeHandler();
          props.successModalReadyHandler();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
=======
      props.onSignup(
        inputConfigs.fName.value,
        inputConfigs.lName.value,
        inputConfigs.username.value,
        inputConfigs.password.value,
        inputConfigs.email.value,
        [],
        []
      );
    }
  };

  // const goBackToFormHandler = () => {
  //   setSubmitError(false);
  // };

>>>>>>> TOP19
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

  if (props.loading && !props.readyToSubmit) {
    modalBody = <Spinner animation="border" role="status"></Spinner>;
<<<<<<< HEAD
=======
  } else if (props.submitError) {
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
          onClick={props.onSignupGoBackToForm}
        >
          Go back
        </Button>
      </div>
    );

    modalBody = (
      <DisplayModal
        title={"Error!"}
        body={errorBody}
        closeHandler={props.closeSignupHandler}
        styles={styles}
      ></DisplayModal>
    );
  } else if (props.readyToSubmit) {
    modalBody = <SuccessAccCreated></SuccessAccCreated>;
>>>>>>> TOP19
  }
  // else if (submitting) {
  //   modalBody = (
  //     <SuccessAccCreated
  //       show={successAccountCreated}
  //       closeHandler={closeSuccessCreation}
  //     ></SuccessAccCreated>
  //   );
  // }

  return modalBody;
};

const mapStateToProps = (state) => {
  return {
    loading: state.signup.loading,
    readyToSubmit: state.signup.readyToSubmit,
    submitError: state.signup.submitError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (
      firstName,
      lastName,
      username,
      password,
      email,
      subscriptions,
      lists
    ) =>
      dispatch(
        actions.signup(
          firstName,
          lastName,
          username,
          password,
          email,
          subscriptions,
          lists
        )
      ),
    onSignupGoBackToForm: () => dispatch(actions.signupGoBackToForm()),
    onSignupStart: () => dispatch(actions.signupStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
