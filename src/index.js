import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Main from "./Main";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

// import main sass file
import "./sass/app.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
