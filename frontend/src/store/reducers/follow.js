import {
    NEW_FOLLOWER,
    NEW_FOLLOWING,
    STORE_FOLLOW_DATA
} from "../actions/actionTypes";
  
  const initialState = {
    followers: [],
    following: [],
  };
  
  export const followersReducer = (state = initialState, action) => {
    switch (action.type) {
    case STORE_FOLLOW_DATA:
      return {
        ...state,
        followers: [...action.payload.followers],
        following: [...action.payload.following]
      }
    case NEW_FOLLOWER:
        return {
            ...state,
            followers: [...state.followers, action.payload]
        }
    case NEW_FOLLOWING: 
        return {
          ...state,
          following: [...state.following, action.payload]
        }
    default:
        return {
            ...state,
        };
    }
  };