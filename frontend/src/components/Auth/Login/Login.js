import React from "react";
import DisplayModal from "../../UI/DisplayModal/DisplayModal";

const Login = (props) => {
  const loginForm = {
    title: "Login To Existing Account",
    formInputs: {
      username: {
        label: "Username",
        placeholder: "Enter username",
        type: "text",
        value: "",
      },
      password: {
        label: "Password",
        placeholder: "Enter password",
        type: "password",
        value: "",
      },
    },
  };
  return (
    <DisplayModal
      closeLoginHandler={props.closeLoginHandler}
      type="login"
      config={loginForm}
    />
  );
};

export default Login;
