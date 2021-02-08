import axios from "axios";
import {
  LIST_ENTRIES_REQUEST,
  LIST_ENTRIES_SUCCESS,
  LIST_ENTRIES_FAIL,
} from "./actionTypes";

export const getListEntries = (listId) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_ENTRIES_REQUEST,
    });

    const payload = await axios.get(
      `http://localhost:5000/api/listEntry/${listId}`
    );
    dispatch({
      type: LIST_ENTRIES_SUCCESS,
      payload: payload.data,
    });
  } catch (err) {
    dispatch({
      type: LIST_ENTRIES_FAIL,
      payload: err,
    });
  }
};
