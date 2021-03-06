import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  handleLogin,
  handleRestoreSession,
} from "../actions/userActionsCreator";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(handleLogin({ ...this.state }));
    this.setState({
      email: "",
      password: "",
    });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");

    if (accessToken && email) {
      this.props.dispatch(handleRestoreSession({ email, accessToken }));
    }
  }
  render() {
    const { redirect } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="wrap-login">
          <div className="logo-login" />
          <form className="mt-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={this.state.email}
                required
                onChange={this.handleOnChange}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleOnChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <span className="float-right">
              <Link to="/register">Create an account</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  const redirect = user && user.accessToken;
  return {
    redirect,
  };
}
export default connect(mapStateToProps)(Login);
