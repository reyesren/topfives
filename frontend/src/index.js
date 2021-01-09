import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SuccessModal from "./components/SuccessModal";
import DashboardPage from "./pages/DashboardPage";
import "./styles/styles.scss";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <SuccessModal />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
