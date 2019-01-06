import React from "react";
import SelectSingle from "./selectSingle";

const Input = ({
  id,
  label,
  type,
  handleOnFocus,
  errors,
  optionList,
  valueList,
  showError,
  ...rest
}) => {
  const styleElement =
    !showError && errors && errors !== ""
      ? { boxShadow: "0 0 0 0.2rem #c55757" }
      : {};

  const dangerElement =
    showError && errors && errors !== "" ? (
      <div className="alert alert-danger">{errors}</div>
    ) : (
      ""
    );

  const labelElement =
    label !== "" && label ? <label htmlFor={id}>{label}</label> : "";

  const inputElement =
    type === "select" ? (
      <SelectSingle
        uniqueID={id}
        optionList={optionList}
        valueList={valueList}
        handleOnFocus={handleOnFocus}
        {...rest}
      />
    ) : (
      <input
        id={id}
        className="form-control"
        type={type}
        onFocus={() => handleOnFocus(id)}
        style={styleElement}
        {...rest}
      />
    );

  return (
    <div className="form-group">
      {labelElement}
      {inputElement}
      {dangerElement}
    </div>
  );
};

Input.defaultProps = {
  handleOnFocus: () => {}
};

export default Input;
