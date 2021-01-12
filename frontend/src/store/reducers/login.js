import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  submitError: "",
  loggedIn: false,
};

const loginStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    loggedIn: true,
  };
};

const loginError = (state, action) => {
  return {
    ...state,
    loading: false,
    submitError: action.error,
  };
};

const loginGoBackToForm = (state, action) => {
  return {
    ...state,
    submitError: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_ERROR:
      return loginError(state, action);
    case actionTypes.LOGIN_BACK:
      return loginGoBackToForm(state, action);
    default:
      return state;
  }
};

export default reducer;
