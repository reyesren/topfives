import axios from "axios";
import {
  LIST_SEARCH_FAIL,
  LIST_SEARCH_REQUEST,
  LIST_SEARCH_SUCCESS,
  USER_SEARCH_RESET,
  LIST_SHOW,
  LIST_SHOW_EDIT,
  LIST_CREATE_SUCCESS,
  EDIT_LIST_REQUEST,
  EDIT_LIST_SUCCESS,
  EDIT_LIST_FAIL,
} from "./actionTypes";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const getLists =
  (listTitle, pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_SEARCH_RESET,
      });
      dispatch({
        type: LIST_SEARCH_REQUEST,
      });

      const users = await axios.get(
        `http://localhost:5000/api/lists?listTitle=${listTitle}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: LIST_SEARCH_SUCCESS,
        payload: users.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: LIST_SEARCH_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const createList = (listTitle, description) => async (dispatch) => {
  try {
    const data = { listTitle, description };
    // TODO: dispatch LIST CREATION REQUEST dispatch({})
    const res = await axios.post(`http://localhost:5000/api/lists`, data);
    dispatch({
      type: LIST_SHOW_EDIT,
      payload: res.data,
    });
    return dispatch({
      type: LIST_CREATE_SUCCESS,
      payload: { listTitle, description },
    });
  } catch (err) {
    console.log(err);
  }
};

export const showList = (listTitle) => (dispatch) => {
  console.log(listTitle);
  dispatch({
    type: LIST_SHOW,
    payload: listTitle,
  });
};

export const editList =
  (listTitle, listType, listItems, id) => async (dispatch) => {
    try {
      //console.log(listTitle, listType, listItems, id);
      let body = { listTitle, listType, listItems, id };
      dispatch({
        type: EDIT_LIST_REQUEST,
      });
      await axios.put(`http://localhost:5000/api/lists/${id}`, body);
      dispatch({
        type: EDIT_LIST_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: EDIT_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
