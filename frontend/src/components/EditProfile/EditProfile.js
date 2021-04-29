import React, { useState } from "react";
// import Spinner from "react-bootstrap/Spinner";
// // import DisplayModal from "../../DisplayModal/DisplayModal";
// import Button from "react-bootstrap/Button";
import ReusableForm from "../ReusableForm/ReusableForm";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = (props) => {
  const dispatch = useDispatch();

  // const loading = useSelector((state) => {
  //   return state.auth.loading;
  // });
  const profile = useSelector((state) => {
    return state.profile;
  });
  const { firstName, lastName, bio, image } = profile;

  const [errors, setErrors] = useState({});
  const [editFields, setEditFields] = useState({
    fName: {
      label: "First Name",
      placeholder: "First Name",
      type: "",
      value: firstName,
      errorMsg: "Your first name cannot be empty!",
      isValid: true,
    },
    lName: {
      label: "Last Name",
      placeholder: "Last Name",
      type: "",
      value: lastName,
      errorMsg: "Your last name cannot be empty!",
      isValid: true,
    },
    bio: {
      label: "Bio",
      placeholder: "Enter Bio",
      type: "text",
      as: "textarea",
      value: bio,
      errorMsg: "Please provide a password.",
      isValid: true,
    },
    image: {
      label: "Change Profile Picture",
      value: image.url,
    },
  });
  console.log(editFields.fName.value);
  const formTitle = "Edit Profile";
  const formLayout = [["fName", "lName"], "image", "bio"];

  // const onLogin = (username, password, isSignup, closeHandler) => {
  //   dispatch(actions.auth(username, password, isSignup, closeHandler));
  // };
  // const onLoginGoBackToForm = () => {
  //   dispatch(actions.authGoBackToForm());
  // };
  // const onLoginStart = () => {
  //   dispatch(actions.authStart());
  // };
  // const onLoginFail = () => {
  //   dispatch(actions.authFail());
  // };

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
    <ReusableForm
      closeHandler={props.closeHandler}
      show={props.show}
      type="edit"
      config={editFields}
      title={formTitle}
      changed={inputChangedHandler}
      layout={formLayout}
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