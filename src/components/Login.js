import React, { Component } from "react";
import Floatlabelinput from "./FloatLabelInput";
import { connect } from "react-redux";
import StoreUser from "../actions/StoreUser";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let configurationObject = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    };
    fetch("http://localhost:3001/api/v1/login", configurationObject)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          throw new Error(json.error + " " + json.message);
        }
        this.props.storeUser(json.user);
        localStorage.setItem("token", json.jwt);

        this.setState({
          password: "",
          email: "",
        });
        this.props.history.push("/home");
      })
      .catch((error) => {
        // TODO: change color of input and alert user of the error
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Floatlabelinput
          resource="email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <Floatlabelinput
          resource="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  storeUser: (user) => dispatch(StoreUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
