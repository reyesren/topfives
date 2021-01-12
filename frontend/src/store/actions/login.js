import axios from "axios";
import * as actionTypes from "./actionTypes";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_ERROR,
    error: error,
  };
};

export const loginGoBackToForm = () => {
  return {
    type: actionTypes.LOGIN_BACK,
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    const loginData = {
      username: username,
      password: password,
    };
    let url = "http://localhost:5000/api/users/login";
    axios
      .post(url, loginData)
      .then((response) => {
        dispatch(loginSuccess());
        localStorage.setItem("token", response.data);
      })
      .catch((err) => {
        dispatch(loginFail(err.response.data.message));
      });
  };
};
