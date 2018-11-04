import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">{this.getNavbarText()}</span>
      </nav>
    );
  }

  getNavbarText() {
    const { counterCount } = this.props;
    return counterCount === 0 ? (
      <span>No counters with a non-zero value.</span>
    ) : (
      <React.Fragment>
        <span>Counters with a non-zero value -> </span>
        <span className="badge bagde-pill badge-info">{counterCount}</span>
      </React.Fragment>
    );
  }
}

export default Navbar;
