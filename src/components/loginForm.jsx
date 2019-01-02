import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    showError: { username: true, password: false, name: "" },
    errors: {
      initialKey: "NA"
    }
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", true)}
          {this.renderInput("password", "Password", "password", false)}
          {this.renderInput("name", "Name", "text", false)}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }

  doSubmit = () => {};
}

export default LoginForm;
