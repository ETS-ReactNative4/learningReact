import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import App from "./App";
//import Counter from "./components/counter";

// Render component to the ui
ReactDOM.render(<App />, document.getElementById("root"));

// Unregistter service worker
serviceWorker.unregister();
