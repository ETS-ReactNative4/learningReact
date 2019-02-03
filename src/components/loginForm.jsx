import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import authService from "../services/authService";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    showError: { email: true, password: false },
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
      .label("Password")
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
            {this.renderSubmitButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }

  doSubmit = async () => {
    const response = await authService.loginUser(this.state.data);
    if (response) {
      toast.error(response);
    } else {
      this.props.onLogin();
      const { state } = this.props.location;
      if (state) {
        this.props.history.replace(state.from);
      } else {
        this.props.history.replace("/");
      }
    }
  };
}

export default LoginForm;
