import React from "react";

const InputText = ({ id, text, value, handleChange, isFocus }) => {
  const autoFocus = isFocus ? "autoFocus" : "";

  return (
    <div className="form-group">
      <label htmlFor={id}>{text}</label>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        id={id}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default InputText;
