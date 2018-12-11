import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import $ from "jquery";
//import App from "./App";
import Movies from "./components/movies";

// Render component to the ui
ReactDOM.render(<Movies />, document.getElementById("root"));

// Unregistter service worker
serviceWorker.unregister();

$(function() {
  var genreTabAutoHide;

  document.addEventListener("click", evt => {
    if (
      !$(evt.target).hasClass("list-group-item") &&
      !$(evt.target).hasClass("genreShowBtn")
    ) {
      clearTimeout(genreTabAutoHide);
      $("#genreTab").hide();
      $("#movieTab").css("opacity", "1");
    }
  });

  $(".genreShowBtn").click(function() {
    clearTimeout(genreTabAutoHide);
    $("#genreTab").show();
    $("#movieTab").css("opacity", "0.5");
    genreTabAutoHide = setTimeout(function() {
      $("#genreTab").hide();
      $("#movieTab").css("opacity", "1");
    }, 5000);
  });

  $(".list-group-item").click(function() {
    if (window.innerWidth <= 799) {
      $("#genreTab").hide();
      $("#movieTab").css("opacity", "1");
    }
  });

  $(window).on("resize", function() {
    if (window.innerWidth > 799) {
      clearTimeout(genreTabAutoHide);
      $("#genreTab").show();
      $("#movieTab").css("opacity", "1");
    } else {
      $("#genreTab").hide();
      $(".genreShowBtn").show();
    }
  });
});
