import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../actions/actionTypes";

export const profileReducer = (
  state = {
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    lists: [],
    subscribers: null,
    image: null,
    loading: false,
    error: null,
    bio: null,
  },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
        email: action.payload.email,
        lists: action.payload.lists,
        image: action.payload.image,
        subscribers: action.payload.subscribers,
        bio: action.payload.bio,
        loading: false,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
