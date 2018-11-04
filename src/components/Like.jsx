import React, { Component } from "react";

class Like extends Component {
  render() {
    const { isLiked, switchLike, id } = this.props;
    return (
      <i
        onClick={() => switchLike(id)}
        className={this.renderLikeIcon(isLiked)}
        aria-hidden="true"
      />
    );
  }

  renderLikeIcon(isLiked) {
    return isLiked === true ? "fa fa-heart" : "fa fa-heart-o";
  }
}

export default Like;
