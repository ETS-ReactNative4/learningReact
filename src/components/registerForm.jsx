import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    showError: { email: true, password: false, name: false },
    errors: { initialKey: "NA" }
  };

  schema = {
    email: Joi.string()
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
    const userData = authService.getUser();
    if (Object.keys(userData).length > 1) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Username", "text", true)}
            {this.renderInput("password", "Password", "password", false)}
            {this.renderInput("name", "Name", "text", false)}
            {this.renderSubmitButton("Register")}
          </form>
        </div>
      </React.Fragment>
    );
  }

  doSubmit = async () => {
    const response = await authService.registerUser(this.state.data);
    if (response) {
      toast.error(response);
    } else {
      this.props.history.replace("/");
    }
  };
}

export default RegisterForm;
