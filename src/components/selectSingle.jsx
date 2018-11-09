import React, { Component } from "react";

class SelectSingle extends Component {
  render() {
    const { lableName, onChange } = this.props;
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" for="inputGroupSelect01">
            {lableName}
          </label>
        </div>
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={onChange}
        />
      </div>
    );
  }
}

export default SelectSingle;
