import React, { Component } from "react";
import InputText from "./inputText";

class LoginForm extends Component {
  state = { account: { username: "", password: "" } };

  render() {
    const { account } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <InputText
            id="username"
            value={account.username}
            handleChange={this.handleChange}
            text={"Username"}
            isFocus={true}
          />
          <InputText
            id="password"
            value={account.password}
            handleChange={this.handleChange}
            text={"Password"}
            isFocus={false}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ account });
  };
}

export default LoginForm;
