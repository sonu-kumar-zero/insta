import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Userstate from "context/Userstate";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <Userstate>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Userstate>
  </React.StrictMode>
);
