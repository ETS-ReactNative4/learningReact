import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import authService from "../services/authService";
import { ToastContainer, toast } from "react-toastify";

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
    try {
      const { data: jwt } = await authService.loginUser(this.state.data);
      localStorage.setItem("token", jwt);
      this.props.history.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
}

export default LoginForm;
