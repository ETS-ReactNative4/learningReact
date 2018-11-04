import React, { Component } from "react";
import Counter from "../components/counter";

class Counters extends Component {
  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-success btn-md"
          onClick={this.props.onAddCounter}
        >
          Add
        </button>
        <button
          className="btn btn-info btn-md"
          style={{ marginLeft: "2%" }}
          onClick={this.props.onReset}
        >
          Reset
        </button>
        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            counter={counter}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
