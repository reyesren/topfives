import axios from "axios";
import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_SEARCH_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  LIST_SEARCH_RESET,
} from "./actionTypes";

export const getProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });
    const payload = await axios.get(`http://localhost:5000/api/users/${id}`);
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: payload.data,
    });

    // const payloadData = await payload.json();
  } catch (err) {
    dispatch({
      type: USER_PROFILE_FAIL,
    });
  }
};

export const getUsers = (username, pageNumber = "") => async (dispatch) => {
  try {
    dispatch({
      type: LIST_SEARCH_RESET,
    });
    dispatch({
      type: USER_SEARCH_REQUEST,
    });

    const users = await axios.get(
      `http://localhost:5000/api/users?username=${username}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: USER_SEARCH_SUCCESS,
      payload: users.data,
    });
  } catch (err) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
