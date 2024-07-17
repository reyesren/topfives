import axios from "axios";
import * as actionTypes from "./actionTypes";
//import socket from "../../socket";

// enum for auth username/password validation fails
const ErrorStatuses = {
  AUTH_ERR_NO_FOUND_USER:
    "There is no account with that username. Please try again.",
  AUTH_ERR_INCORRECT_PASS:
    "The password you entered is incorrect. Please try again.",
  DEFAULT: "This is the default error message.",
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (isSignup, userInfo, socket) => {
  //console.log(socket);
  if (socket) {
    socket.auth = { username: userInfo.username };
    socket.connect();
  }
  return {
    type: actionTypes.AUTH_SUCCESS,
    isSignup: isSignup,
    userInfo: userInfo,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error,
  };
};

export const authGoBackToForm = () => {
  return {
    type: actionTypes.AUTH_GO_BACK,
  };
};

export const logout = (socket) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("sessionID");
  socket.disconnect();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckIfLoggedIn = (socket) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout(socket));
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(authSuccess(false, userInfo, socket));
    }
  };
};

export const auth = (
  username,
  password,
  isSignup,
  closeHandler = null,
  firstName = null,
  lastName = null,
  email = null,
  subscriptions = null,
  lists = null,
  socket
) => {
  return (dispatch) => {
    let authData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      subscriptions: subscriptions,
      lists: lists,
    };
    let url = "http://localhost:5000/api/users/signup";
    if (!isSignup) {
      url = "http://localhost:5000/api/users/login";
      authData = {
        username: username,
        password: password,
      };
    }
    axios
      .post(url, authData)
      .then((response) => {
        let userInfo = {
          username: response.data.username,
          name: response.data.name,
          _id: response.data._id,
        };
        dispatch(authSuccess(isSignup, userInfo, socket));
        if (!isSignup && closeHandler) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          closeHandler();
        } else if (!isSignup && !closeHandler) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        //socket.connect();
        //console.log(socket);
      })
      .catch((err) => {
        console.log(err);
        const errStatus = err.response.data.message;
        const errorStatusEnum = Object.keys(ErrorStatuses);
        let errMsg;
        if (errorStatusEnum.find((status) => status === errStatus)) {
          errMsg = ErrorStatuses[errStatus];
        } else {
          errMsg = ErrorStatuses["DEFAULT"];
        }
        dispatch(authFail(errMsg));
      });
  };
};
