import {
  LIST_SEARCH_FAIL,
  LIST_SEARCH_REQUEST,
  LIST_SEARCH_SUCCESS,
  LIST_SEARCH_RESET,
} from "../actions/actionTypes";

export const searchListsResultsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case LIST_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_SEARCH_SUCCESS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
      };
    case LIST_SEARCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LIST_SEARCH_RESET:
      return {
        ...state,
        lists: [],
      };
    default:
      return state;
  }
};
