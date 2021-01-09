import React from "react";
import DisplayModal from "../../UI/DisplayModal/DisplayModal";

const Login = (props) => {
  const loginForm = {
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
  };
  const formTitle = "Login To Existing Account";
  return (
    <DisplayModal
      closeLoginHandler={props.closeLoginHandler}
      type="login"
      config={loginForm}
      title={formTitle}
    />
  );
};

export default Login;
