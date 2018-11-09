import React, { Component } from "react";

class Option extends Component {
  render() {
    const { value, optionText, isSelected } = this.props;
    return isSelected === true ? (
      <option value={value} selected>
        {optionText}
      </option>
    ) : (
      <option value={value}>{optionText}</option>
    );
  }
}

export default Option;
