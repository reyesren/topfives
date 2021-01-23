import axios from "axios";
import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
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
