import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Nav/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";

// adding this comment to be able to commit Develop branch
const App = (props) => {
  return (
    <Router>
      <Header />
      <Route path="/" exact>
        <DashboardPage />
      </Route>
    </Router>
  );
};

export default App;
// <div className="App">
//   <header className="App-header">
//     <Button variant="success" onClick={openSignupHandler}>
//       Create a New Account
//     </Button>
//     <Button variant="success" onClick={openLoginHandler}>
//       Login
//     </Button>
//     {signupModal}
//     {loginModal}
//   </header>
// </div>
