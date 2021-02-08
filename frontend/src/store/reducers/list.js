import {
  LIST_SEARCH_FAIL,
  LIST_SEARCH_REQUEST,
  LIST_SEARCH_SUCCESS,
  LIST_SEARCH_RESET,
  LIST_SHOW,
  LIST_RESET,
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
        lists: action.payload.lists,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
        error: "",
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

export const showListReducer = (state = { list: {} }, action) => {
  switch (action.type) {
    case LIST_SHOW:
      return {
        ...state,
        list: action.payload,
      };
    case LIST_RESET:
      return {
        ...state,
        list: {},
      };
    default:
      return state;
  }
};
