import React, { Component } from "react";
import Page from "./page";

class Pagenation extends Component {
  render() {
    const { numberOfPages, pageClick, pageNumber } = this.props;
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-end">
          {this.renderPages(numberOfPages, pageClick, pageNumber)}
        </ul>
      </nav>
    );
  }

  renderPages(numberOfPages, pageClick, pageNumber) {
    let pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      let isSelected = false;
      if (i + 1 === pageNumber) {
        isSelected = true;
      }
      pages.push(
        <Page
          key={"Page-" + (i + 1)}
          pageClick={pageClick}
          pageNumber={i + 1}
          pageText={i + +1}
          isSelected={isSelected}
        />
      );
    }
    return pages;
  }
}

export default Pagenation;
