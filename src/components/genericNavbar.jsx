import React from "react";
import { NavLink } from "react-router-dom";

const GenericNavbar = ({ NavbarHeading, NavbarItems }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        {NavbarHeading}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">{renderNavbarItems()}</ul>
      </div>
    </nav>
  );

  function renderNavbarItems() {
    return NavbarItems.map((navbarItem, index) => (
      <NavLink className="nav-item nav-link" key={index} to="#">
        {navbarItem}
      </NavLink>
    ));
  }
};

export default GenericNavbar;
