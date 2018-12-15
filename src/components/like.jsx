import React from "react";
import PropTypes from "prop-types";

const Like = ({ isLiked, switchLike, id }) => {
  return (
    <i
      onClick={() => switchLike(id)}
      className={renderLikeIcon(isLiked)}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );

  function renderLikeIcon() {
    return isLiked === true ? "fa fa-heart" : "fa fa-heart-o";
  }
};

Like.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  switchLike: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Like;
