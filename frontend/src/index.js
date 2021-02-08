import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import "./styles/styles.scss";
import authReducer from "./store/reducers/auth";
import { listEntriesReducer } from "./store/reducers/listEntry";
import {
  searchListsResultsReducer,
  showListReducer,
} from "./store/reducers/list";
import {
  profileReducer,
  searchUsersResultsReducer,
} from "./store/reducers/profile";
import reportWebVitals from "./reportWebVitals";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  listEntries: listEntriesReducer,
  searchUsersResults: searchUsersResultsReducer,
  searchListsResults: searchListsResultsReducer,
  showList: showListReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
