import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    showError: {},
    errors: {},
    optionList: [],
    valueList: []
  };

  genericValidate = data => {
    const results = Joi.validate(data || this.state.data, this.schema, {
      abortEarly: false
    });

    if (results.error === null) return {};

    const errorList = results.error.details;
    const errors = {};
    errorList.forEach(e => {
      errors[e.path[0]] = e.message;
    });

    return errors;
  };

  handleOnFocus = id => {
    const showError = { ...this.state.showError };

    for (var key in showError) {
      if (showError.hasOwnProperty(key)) {
        showError[key] = key === id ? true : false;
      }
    }

    this.setState({ showError });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.doSubmit();
  };

  doSubmit = () => {};

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.currentTarget.id] = e.currentTarget.value;
    const errors = { ...this.genericValidate(data) };

    this.setState({ data, errors });
  };

  renderSubmitButton(label) {
    const { errors } = this.state;
    const isSubmit = Object.keys(errors).length === 0 ? "" : "disabled";
    return (
      <button disabled={isSubmit} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(
    id,
    label,
    type,
    autoFocusDefault,
    optionList = [],
    valueList = []
  ) {
    const { data, errors, showError } = this.state;
    return (
      <Input
        id={id}
        value={data[id]}
        onChange={this.handleChange}
        label={label}
        autoFocus={autoFocusDefault}
        errors={errors[id]}
        handleOnFocus={this.handleOnFocus}
        type={type}
        optionList={optionList}
        valueList={valueList}
        showError={showError[id]}
      />
    );
  }
}

export default Form;
