import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from "../actions/actionTypes";

export const listDetailsReducer = (state = { entries: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        _id: action.payload._id,
        listTitle: action.payload.listTitle,
        listType: action.payload.listType,
        creator: action.payload.creator,
        entries: action.payload.entries,
      };
    case USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
