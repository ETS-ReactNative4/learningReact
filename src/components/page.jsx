import React, { Component } from "react";

class Page extends Component {
  state = {};
  render() {
    const { pageText, pageClick, pageNumber, isSelected } = this.props;
    return (
      <li className={this.getPageClasses(isSelected)}>
        <button className="page-link" onClick={() => pageClick(pageNumber)}>
          {pageText}
        </button>
      </li>
    );
  }

  getPageClasses(isSelected) {
    let classes = "page-item ";
    return isSelected ? (classes += "active") : classes;
  }
}

export default Page;
