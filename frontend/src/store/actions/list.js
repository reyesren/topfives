import axios from "axios";
import {
  LIST_SEARCH_FAIL,
  LIST_SEARCH_REQUEST,
  LIST_SEARCH_SUCCESS,
  USER_SEARCH_RESET,
  LIST_SHOW,
  LIST_CREATE_REQUEST,
  LIST_CREATE_SUCCESS,
  LIST_CREATE_FAIL,
  LIST_SHOW_EDIT_REQUEST,
  LIST_SHOW_EDIT_SUCCESS,
  LIST_SHOW_EDIT_FAIL,
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
    dispatch({
      type: LIST_CREATE_REQUEST,
    });
    const res = await axios.post(`http://localhost:5000/api/lists`, data);
    return dispatch({
      type: LIST_CREATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showList = (listTitle) => (dispatch) => {
  dispatch({
    type: LIST_SHOW,
    payload: listTitle,
  });
};

export const editList =
  (listTitle, listType, listItems, id) => async (dispatch) => {
    try {
      let body = { listTitle, listType, listItems, id };
      dispatch({
        type: LIST_SHOW_EDIT_REQUEST,
      });
      await axios.put(`http://localhost:5000/api/lists/${id}`, body);
      dispatch({
        type: LIST_SHOW_EDIT_SUCCESS,
        payload: { ...body },
      });
    } catch (err) {
      dispatch({
        type: LIST_SHOW_EDIT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
