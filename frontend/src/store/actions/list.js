import axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from "./actionTypes";

export const getListDetails = (listId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const payload = await axios.get(
      `http://localhost:5000/api/lists/${listId}`
    );
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: payload.data,
    });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: err,
    });
  }
};
