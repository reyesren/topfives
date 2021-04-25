import { NEW_FOLLOWER, NEW_FOLLOWING, STORE_FOLLOW_DATA } from "../actions/actionTypes";


export const storeFollowData = (followData) => async (dispatch) => {
    dispatch({type: STORE_FOLLOW_DATA, payload: {followers: followData.followers, following: followData.following}})
}

export const addNewFollower = (follower) => async (dispatch) => {
    console.log(follower);
    dispatch({type: NEW_FOLLOWER, payload: follower})
}

export const addNewFollowing = (following) => async (dispatch) => {
    console.log(following);
    dispatch({type: NEW_FOLLOWING, payload: following})
}