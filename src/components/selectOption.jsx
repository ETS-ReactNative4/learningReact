import React, { Component } from "react";

class Option extends Component {
  render() {
    const { value, optionText } = this.props;
    return <option value={value}>{optionText}</option>;
  }
}

export default Option;
