import React, { Component } from "react";
import Option from "./selectOption";

class SelectSingle extends Component {
  render() {
    const {
      labelName,
      onChangeSelect,
      uniqueID,
      optionList,
      moviePerPage,
      valueList
    } = this.props;
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            {labelName}
          </label>
        </div>
        <select
          className="custom-select"
          id={uniqueID}
          onChange={onChangeSelect}
          value={moviePerPage}
        >
          {this.renderOptions(optionList, valueList)}
        </select>
      </div>
    );
  }

  renderOptions(optionList, valueList) {
    return optionList.map((option, index) => {
      return (
        <Option key={index + 1} value={valueList[index]} optionText={option} />
      );
    });
  }
}

export default SelectSingle;
