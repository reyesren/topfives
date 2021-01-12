import axios from "axios";
import * as actionTypes from "./actionTypes";

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

export const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
};

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    error: error,
  };
};

export const signupGoBackToForm = () => {
  return {
    type: actionTypes.SIGNUP_GO_BACK,
  };
};

export const signup = (
  firstName,
  lastName,
  username,
  password,
  email,
  subscriptions,
  lists
) => {
  return (dispatch) => {
    const signupData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: email,
      subscriptions: subscriptions,
      lists: lists,
    };
    let url = "http://localhost:5000/api/users/signup";
    axios
      .post(url, signupData)
      .then((response) => {
        dispatch(signupSuccess());
      })
      .catch((err) => {
        dispatch(signupFail(err.response.data.message));
      });
  };
};
