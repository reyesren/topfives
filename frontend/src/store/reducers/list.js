import {
  LIST_SEARCH_FAIL,
  LIST_SEARCH_REQUEST,
  LIST_SEARCH_SUCCESS,
  LIST_SEARCH_RESET,
  LIST_SHOW,
  LIST_SHOW_EDIT,
  LIST_CREATE_SUCCESS,
  LIST_RESET,
  EDIT_LIST_REQUEST,
  EDIT_LIST_SUCCESS,
  EDIT_LIST_FAIL,
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
    case LIST_SHOW_EDIT:
      return {
        ...state,
        ...action.payload,
        isEdit: true,
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

export const editListReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { list: {} }, action) => {
  switch (action.type) {
    case LIST_CREATE_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
