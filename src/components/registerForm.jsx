import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";

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
    try {
      const { headers } = await userService.registerUser(this.state.data);
      localStorage.setItem("token", headers["x-auth-token"]);

      this.props.history.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data, { className: "customToast" });
      }
    }
  };
}

export default RegisterForm;
