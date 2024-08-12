import {
  LIST_SEARCH_FAIL,
  LIST_SEARCH_REQUEST,
  LIST_SEARCH_SUCCESS,
  LIST_SEARCH_RESET,
  LIST_SHOW,
  LIST_SHOW_EDIT_REQUEST,
  LIST_SHOW_EDIT_SUCCESS,
  LIST_SHOW_EDIT_FAIL,
  LIST_CREATE_REQUEST,
  LIST_CREATE_SUCCESS,
  LIST_CREATE_FAIL,
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
    case LIST_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LIST_CREATE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        isEdit: true,
      };
    case LIST_SHOW:
      return {
        ...state,
        list: action.payload,
      };
    case LIST_SHOW_EDIT_REQUEST:
      return {
        ...state,
        ...action.payload,
        isEdit: true,
      };
    case LIST_SHOW_EDIT_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload,
        },
        loading: false,
      };
    case LIST_SHOW_EDIT_FAIL:
      return {
        ...state,
        ...action.payload,
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
