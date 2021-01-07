import React, { useState } from "react";
import DisplayModal from "../../UI/DisplayModal/DisplayModal";

const Signup = (props) => {
  const [signupForm, setSignupForm] = useState({
    title: "Create a New Account",
    formInputs: {
      fNameConfig: {
        label: "Full Name",
        placeholder: "First Name",
        type: "",
        value: "",
      },
      lNameConfig: {
        label: "",
        placeholder: "Last Name",
        type: "",
        value: "",
      },
      username: {
        label: "Username and Email",
        placeholder: "Username",
        type: "",
        value: "",
      },
      email: {
        label: "",
        placeholder: "Email",
        type: "email",
        value: "",
      },
      password: {
        label: "Password",
        placeholder: "Password",
        type: "password",
        value: "",
      },
      confirmPassword: {
        label: "",
        placeholder: "Confirm Password",
        type: "password",
        value: "",
      },
    },
  });

  return <DisplayModal config={signupForm}></DisplayModal>;
};

export default Signup;
