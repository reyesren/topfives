import {
  LIST_ENTRIES_REQUEST,
  LIST_ENTRIES_SUCCESS,
  LIST_ENTRIES_FAIL,
} from "../actions/actionTypes";

export const listEntriesReducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case LIST_ENTRIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_ENTRIES_SUCCESS:
      return {
        ...state,
        entries: action.payload,
        loading: false,
      };
    case LIST_ENTRIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
