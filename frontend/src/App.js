import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Nav/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions/index";
import UserPage from "./pages/UserPage";
import SearchResultsPage from "./pages/SearchResultsPage";

// adding this comment to be able to commit Develop branch
const App = (props) => {
  const dispatch = useDispatch();
  const checkIfLoggedIn = useCallback(() => {
    dispatch(actions.authCheckIfLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    checkIfLoggedIn();
  }, [checkIfLoggedIn]);
  return (
    <Router>
      <Header />
      <Route component={DashboardPage} path="/" exact />
      <Route component={UserPage} path="/user/:id" />
      <Route component={SearchResultsPage} path="/search" />
    </Router>
  );
};

export default App;
