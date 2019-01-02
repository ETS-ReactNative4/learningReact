import $ from "jquery";

export default function mobileCompat() {
  var genreTabAutoHide;

  document.addEventListener("click", evt => {
    if (
      !$(evt.target).hasClass("list-group-item") &&
      !$(evt.target).hasClass("genreShowBtn") &&
      window.innerWidth <= 799
    ) {
      clearTimeout(genreTabAutoHide);
      $("#genreTab").hide();
      $("#movieTab").css("opacity", "1");
      $("#hiddenButton").show();
    } else if (
      $(evt.target).hasClass("list-group-item") &&
      window.innerWidth <= 799
    ) {
      clearTimeout(genreTabAutoHide);
      $("#genreTab").hide();
      $("#movieTab").css("opacity", "1");
      $("#hiddenButton").show();
    }
  });

  $(".genreShowBtn").click(function() {
    clearTimeout(genreTabAutoHide);
    $("#genreTab").show();
    $("#movieTab").css("opacity", "0.5");
    $("#hiddenButton").hide();
    genreTabAutoHide = setTimeout(function() {
      $("#genreTab").hide();
      $("#movieTab").css("opacity", "1");
      $("#hiddenButton").show();
    }, 5000);
  });

  $(window).on("resize", function() {
    if (window.innerWidth > 799) {
      clearTimeout(genreTabAutoHide);
      $("#genreTab").show();
      $("#movieTab").css("opacity", "1");
    } else {
      $("#genreTab").hide();
      $("#hiddenButton").show();
    }
  });
}
