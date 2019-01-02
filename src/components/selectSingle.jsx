import React, { Component } from "react";
import Option from "./selectOption";

class SelectSingle extends Component {
  render() {
    const {
      labelName,
      onChange,
      uniqueID,
      optionList,
      value,
      valueList,
      handleOnFocus
    } = this.props;

    const titleDiv =
      labelName !== "" && labelName ? (
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            {labelName}
          </label>
        </div>
      ) : (
        ""
      );

    return (
      <div className="input-group mb-3">
        {titleDiv}
        <select
          className="custom-select"
          id={uniqueID}
          onChange={onChange}
          value={value}
          onFocus={() => {
            handleOnFocus(uniqueID);
          }}
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

SelectSingle.defaultProps = {
  handleOnFocus: () => {}
};

export default SelectSingle;
