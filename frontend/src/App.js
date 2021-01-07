import React, { useState } from "react";
// import Signup from "./components/UI/DisplayModal/DisplayModalCopy";
import Signup from "./components/Auth/Signup/Signup";
import Login from "./components/Auth/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

// adding this comment to be able to commit Develop branch
const App = (props) => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const openSignupHandler = () => {
    setOpenSignup(true);
  };
  const openLoginHandler = () => {
    setOpenLogin(true);
  };
  const closeSignupHandler = () => {
    setOpenSignup(false);
  };
  const closeLoginHandler = () => {
    setOpenLogin(false);
  };

  const signupModal = openSignup ? (
    <Signup closeSignupHandler={closeSignupHandler}></Signup>
  ) : null;
  const loginModal = openLogin ? (
    <Login closeLoginHandler={closeLoginHandler}></Login>
  ) : null;

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="success" onClick={openSignupHandler}>
          Create a New Account
        </Button>
        <Button variant="success" onClick={openLoginHandler}>
          Login
        </Button>
        {signupModal}
        {loginModal}
      </header>
    </div>
  );
};

export default App;
