import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (isSignup) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    isSignup: isSignup,
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

export const auth = (
  username,
  password,
  isSignup,
  closeHandler = null,
  firstName = null,
  lastName = null,
  email = null,
  subscriptions = null,
  lists = null
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
        dispatch(authSuccess(isSignup));
        if (!isSignup && closeHandler) {
          localStorage.setItem("token", response.data);
          console.log("I GET INSDIE HERE");
          console.log(closeHandler);
          closeHandler();
          console.log("I GET HERE TOO");
        } else if (!isSignup && !closeHandler) {
          localStorage.setItem("token", response.data);
        }
      })
      .catch((err) => {
        console.log("ERR BLOCK");
        console.log(isSignup);
        dispatch(authFail(err.response.data.message));
      });
  };
};
