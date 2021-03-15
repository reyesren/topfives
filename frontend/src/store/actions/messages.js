import { ADD_NEW_MESSAGE, STORE_MESSAGES } from "../actions/actionTypes";

export const storeMessages = (messages, newNotificationFlag) => async (
  dispatch
) => {
  dispatch({
    type: STORE_MESSAGES,
    payload: { messages, newNotificationFlag },
  });
};

export const addNewMessage = (message) => async (dispatch) => {
  dispatch({ type: ADD_NEW_MESSAGE, payload: message });
};
