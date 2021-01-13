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
