import React, { useState } from "react";
// import Signup from "./components/UI/DisplayModal/DisplayModalCopy";
import Signup from "./components/Auth/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

// adding this comment to be able to commit Develop branch
const App = (props) => {
  const [openSignup, setOpenSignup] = useState(false);

  const openSignupHandler = () => {
    setOpenSignup(true);
  };

  const modal = openSignup ? <Signup></Signup> : null;

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="success" onClick={openSignupHandler}>
          Create a New Account
        </Button>
        {modal}
      </header>
    </div>
  );
};

export default App;
