import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  readyToSubmit: false,
  submitError: "",
};

const signupStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    readyToSubmit: true,
  };
};

const signupError = (state, action) => {
  return {
    ...state,
    loading: false,
    submitError: action.error,
  };
};

const signupGoBackToForm = (state, action) => {
  return {
    ...state,
    submitError: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_ERROR:
      return signupError(state, action);
    case actionTypes.SIGNUP_GO_BACK:
      return signupGoBackToForm(state, action);
    default:
      return state;
  }
};

export default reducer;
