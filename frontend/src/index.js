import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./shared-resource/store/store";
import history from "./shared-resource/store/history";
import "./index.css";

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <Provider store={store}>
        <App className="main-app" />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
