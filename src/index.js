import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/js/bootstrap.js";
import Movies from "./components/movies";
import mobileCompat from "./utilities/mobileCompatibility";

ReactDOM.render(
  <BrowserRouter>
    <Movies />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

mobileCompat();
