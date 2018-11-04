import React, { Component } from "react";

export default class Counter extends Component {
  styles = {
    fontSize: "0.8rem",
    fontWeight: "bold",
    verticalAlign: "middle",
    width: "3rem"
  };

  render() {
    const { onIncrement, onDecrement, onDelete, counter } = this.props;

    return (
      <div style={{ marginTop: "1%" }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            onDecrement(counter);
          }}
        >
          Decrement
        </button>
        <span
          style={this.styles}
          className={this.selectBadgeClass(counter.value)}
        >
          {this.formatNumber(counter.value)}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            onIncrement(counter);
          }}
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => {
            onDelete(counter.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }

  selectBadgeClass(value) {
    let badgeClasses = "badge m-2 badge-";
    badgeClasses += value === 0 ? "warning" : "primary";
    return badgeClasses;
  }

  formatNumber(value) {
    return value === 0 ? "Zero" : value;
  }
}
