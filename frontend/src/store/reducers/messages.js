import {
  ADD_NEW_MESSAGE,
  STORE_MESSAGES,
  RESET_NOTIFICATIONS,
} from "../actions/actionTypes";

const initialState = {
  messages: [],
  newNotifications: false,
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_MESSAGES:
      return {
        ...state,
        messages: [...action.payload.messages],
        newNotifications: action.payload.newNotificationFlag,
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        newNotifications: true,
      };
    default:
      return {
        ...state,
      };
  }
};
