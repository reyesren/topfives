import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  readyToSubmit: false,
  submitError: "",
  loggedIn: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  if (action.isSignup) {
    return {
      ...state,
      loading: false,
      readyToSubmit: true,
    };
  } else {
    return {
      ...state,
      loading: false,
      loggedIn: true,
      userInfo: action.userInfo ? action.userInfo : state.userInfo,
    };
  }
};

const authError = (state, action) => {
  return {
    ...state,
    loading: false,
    submitError: action.error,
  };
};

const authGoBackToForm = (state, action) => {
  return {
    ...state,
    submitError: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    loading: false,
    readyToSubmit: false,
    submitError: "",
    loggedIn: false,
    userInfo: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_ERROR:
      return authError(state, action);
    case actionTypes.AUTH_GO_BACK:
      return authGoBackToForm(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
