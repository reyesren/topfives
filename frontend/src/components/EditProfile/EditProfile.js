import React, { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";

import Spinner from "react-bootstrap/Spinner";
// import DisplayModal from "../../DisplayModal/DisplayModal";
import Button from "react-bootstrap/Button";

const EditProfile = (props) => {
  const [errors, setErrors] = useState({});
  const [editFields, setEditFields] = useState({
    fName: {
      label: "First Name",
      placeholder: "First Name",
      type: "",
      value: "",
      errorMsg: "Your first name cannot be empty!",
      isValid: true,
    },
    lName: {
      label: "Last Name",
      placeholder: "Last Name",
      type: "",
      value: "",
      errorMsg: "Your last name cannot be empty!",
      isValid: true,
    },
    bio: {
      label: "Bio",
      placeholder: "Enter password",
      type: "text",
      as: "textarea",
      value: "",
      errorMsg: "Please provide a password.",
      isValid: true,
    },
  });
  const formTitle = "Edit Profile";

  //   const dispatch = useDispatch();

  //   const loading = useSelector((state) => {
  //     return state.auth.loading;
  //   });
  //   const submitError = useSelector((state) => {
  //     return state.auth.submitError;
  //   });

  //   const onLogin = (username, password, isSignup, closeHandler) => {
  //     dispatch(actions.auth(username, password, isSignup, closeHandler));
  //   };
  //   const onLoginGoBackToForm = () => {
  //     dispatch(actions.authGoBackToForm());
  //   };
  //   const onLoginStart = () => {
  //     dispatch(actions.authStart());
  //   };
  //   const onLoginFail = () => {
  //     dispatch(actions.authFail());
  //   };

  const inputChangedHandler = (event, field) => {
    const updatedFields = {
      ...editFields,
      [field]: {
        ...editFields[field],
        value: event.target.value,
      },
    };
    setEditFields(updatedFields);
  };

  //   const validateInputs = () => {
  //     let inputErrors = {};
  //     let valid = true;

  //     let newConfig = {
  //       ...loginForm,
  //       username: {
  //         ...loginForm.username,
  //       },
  //       password: {
  //         ...loginForm.password,
  //       },
  //     };
  //     if (!loginForm.username.value) {
  //       valid = false;
  //       inputErrors = {
  //         ...inputErrors,
  //         username: loginForm.username.errorMsg,
  //       };
  //       newConfig = {
  //         ...newConfig,
  //         username: {
  //           ...newConfig.username,
  //           isValid: false,
  //         },
  //       };
  //     }

  //     if (loginForm.password.value.length < 6) {
  //       valid = false;
  //       inputErrors = {
  //         ...inputErrors,
  //         password: "Your password must be at least 6 characters long.",
  //       };
  //       newConfig = {
  //         ...newConfig,
  //         password: {
  //           ...newConfig.password,
  //           isValid: false,
  //         },
  //       };
  //     }
  //     if (!loginForm.password.value) {
  //       valid = false;
  //       inputErrors = {
  //         ...inputErrors,
  //         password: loginForm.password.errorMsg,
  //       };
  //       newConfig = {
  //         ...newConfig,
  //         password: {
  //           ...newConfig.password,
  //           isValid: false,
  //         },
  //       };
  //     }
  //     setErrors(inputErrors);
  //     setLoginForm(newConfig);
  //     if (!valid) {
  //       onLoginFail();
  //     }
  //     return valid;
  //   };

  //   const submitHandler = (event) => {
  //     event.preventDefault();
  //     onLoginStart();
  //     if (validateInputs()) {
  //       onLogin(
  //         loginForm.username.value,
  //         loginForm.password.value,
  //         false,
  //         props.closeHandler
  //       );
  //     }
  //   };

  let modalBody = (
    <AuthForm
      closeHandler={props.closeHandler}
      show={props.show}
      type="edit"
      config={editFields}
      title={formTitle}
      changed={inputChangedHandler}
      //   validate={validateInputs}
      //   errors={errors}
      //   submit={submitHandler}
    />
  );
  //   if (loading) {
  //     modalBody = <Spinner animation="border" role="status"></Spinner>;
  //   } else if (submitError) {
  //     const styles = {
  //       title: "signup-error-title",
  //       body: "signup-error-body",
  //     };
  //     const errorBody = (
  //       <div>
  //         <div>{submitError}</div>
  //         <Button
  //           className="float-right signup-error-button"
  //           variant="primary"
  //           type="submit"
  //           onClick={onLoginGoBackToForm}
  //         >
  //           Go back
  //         </Button>
  //       </div>
  //     );

  // modalBody = (
  //   <DisplayModal
  //     title={"Error!"}
  //     body={errorBody}
  //     closeHandler={() => setOpenError(false)}
  //     show={openError}
  //     styles={styles}
  //   ></DisplayModal>
  // );
  //   }

  return modalBody;
};

export default EditProfile;
