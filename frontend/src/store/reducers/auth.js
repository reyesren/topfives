import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  readyToSubmit: false,
  submitError: "",
  loggedIn: false,
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
    default:
      return state;
  }
};

export default reducer;
