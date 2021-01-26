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
      errorMsg: "Your bio must contain either 0 characters or at least 75.",
      isValid: true,
    },
    image: {
      label: "Change Profile Picture",
      value: image.url,
      errorMsg:
        "This is not a valid photo. Use only .png, .jpeg, .jpg formats.",
    },
  });
  // const changeImageHandler = (e) => {
  //   // console.log(e.target.files[0]);
  //   let file = e.target.files[0];
  //   let reader = new FileReader();
  //   // console.log(url);
  //   // console.log(editFields.image.value);
  //   reader.onloadend = () => {
  //     setEditFields({
  //       ...editFields,
  //       image: {
  //         ...image,
  //         value: reader.result,
  //       },
  //     });
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };
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
    console.log("I GET HERE");
    const updatedFields = {
      ...editFields,
      [field]: {
        ...editFields[field],
        value: event.target.value,
      },
    };
    setEditFields(updatedFields);
  };

  const validateInputs = () => {
    let inputErrors = {};
    let valid = true;

    let newConfig = {
      ...editFields,
      fName: {
        ...editFields.fName,
      },
      lName: {
        ...editFields.lName,
      },
      bio: {
        ...editFields.bio,
      },
      image: {
        ...editFields.image,
      },
    };
    if (!editFields.fName.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        fName: editFields.fName.errorMsg,
      };
      newConfig = {
        ...newConfig,
        fName: {
          ...newConfig.fName,
          isValid: false,
        },
      };
    }

    if (!editFields.lName.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        lName: editFields.lName.errorMsg,
      };
      newConfig = {
        ...newConfig,
        lName: {
          ...newConfig.lName,
          isValid: false,
        },
      };
    }

    if (editFields.bio.value.length < 75) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        bio: editFields.bio.errorMsg,
      };
      newConfig = {
        ...newConfig,
        bio: {
          ...newConfig.bio,
          isValid: false,
        },
      };
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    console.log(editFields.image.value);
    if (!allowedExtensions.exec(editFields.image.value)) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        image: editFields.image.errorMsg,
      };
      newConfig = {
        ...newConfig,
        image: {
          ...newConfig.image,
          isValid: false,
        },
      };
    }

    setErrors(inputErrors);
    setEditFields(newConfig);
    return valid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // onLoginStart();
    if (validateInputs()) {
      console.log("inputs were validated");
    }
  };

  let modalBody = (
    <ReusableForm
      closeHandler={props.closeHandler}
      show={props.show}
      type="edit"
      config={editFields}
      title={formTitle}
      changed={inputChangedHandler}
      layout={formLayout}
      // changeImage={changeImageHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
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
