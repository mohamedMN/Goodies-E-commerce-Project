import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProviding from "./services/ThemeProviding";
import { Provider } from "react-redux";
// import { CssBaseline } from "@mui/material";

import store from "./redux/store/ReduxStore";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProviding>
          <App />
        </ThemeProviding>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
