import React, { useEffect, useCallback, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Nav/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions/index";
import UserPage from "./pages/UserPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SocketContext from "./context/socketContext";

// adding this comment to be able to commit Develop branch
const App = (props) => {
  const socket = useContext(SocketContext);
  console.log(socket);
  //socket.connect();
  console.log(socket);
  const dispatch = useDispatch();
  const checkIfLoggedIn = useCallback(() => {
    dispatch(actions.authCheckIfLoggedIn(socket.socket));
  }, [dispatch]);

  useEffect(() => {
    checkIfLoggedIn();
  }, [checkIfLoggedIn]);

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      console.log("session detected");
      socket.socket.auth = { sessionID };
    } else {
      console.log("session not detected");
    }

    socket.socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.socket.userID = userID;
      console.log(socket.socket);
    });

    socket.socket.on("users", (usersList) => {
      console.log(usersList);
      socket.users = [...usersList];
    });
    socket.socket.on("new_follower", (message) => {
      console.log(message);
    });
  }, []);
  return (
    <Router>
      <Header />
      <Route component={DashboardPage} path="/" exact />
      <Route component={UserPage} path="/user/:id" />
      <Route component={SearchResultsPage} path="/search" exact />
      <Route
        component={SearchResultsPage}
        path="/search/:type/:name/page/:pageNumber"
        exact
      />
    </Router>
  );
};

export default App;
