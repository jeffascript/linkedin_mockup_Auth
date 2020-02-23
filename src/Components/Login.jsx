import React, { Component } from "react";
import { Alert, Form, Input, Container, Row, Fade } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  setUserToken: base64 =>
    dispatch({
      type: "SET_USERBASE64",
      payload: base64
    })
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    logged: undefined,
    wrongPass: false,
    isLoading: true,
    signup: false,
    saveCredentials: false
  };

  // componentDidMount=()=>{
  //   let hours = 1/60; // Reset when storage is more than 1 min/hours
  //             let now = new Date().getTime();
  //             let setupTime = localStorage.getItem('setupTime');
  //             if (setupTime == null) {
  //                 localStorage.setItem('setupTime', now)
  //             } else {
  //                 if(now-setupTime > hours*60*60*1000) {
  //                     localStorage.clear()
  //                     this.props.setUserToken(null)
  //                     // localStorage.setItem('setupTime', now);
  //                 }
  //             }

  // }

  

  getCredentials = async e => {
    e.preventDefault();
    //create my "token" starting from username and password
    //contact the APIs to prove identity
    const resp = await fetch("http://app-be.azurewebsites.net/users/signin", {
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (resp.ok) {
      const respJson = await resp.json();
      console.log(respJson);
      if (this.state.saveCredentials) {
        this.props.setUserToken(respJson.access_token);
        localStorage.setItem("access_token", respJson.access_token);
        localStorage.setItem("username", respJson.user.username);
      } else {
        sessionStorage.setItem("access_token", respJson.access_token);
        sessionStorage.setItem("username", respJson.user.username);
        this.props.setUserToken(respJson.access_token);
      }
      // <Redirect to={{pathname:"/login" }}/>
       this.props.history.push("/home");

      this.props.removeIsLoading();
    } else {
      //console log
      this.setState({
        wrongPass: true,
        email: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <div className="login-form mx-auto mt-5">
        <Container>
          <Row>
            <img
              className="mx-auto"
              style={{ display: "block" }}
              width="30%"
              src="https://seeklogo.net/wp-content/uploads/2017/01/linkedin-logo-512x512.png"
              alt="logo"
            />
          </Row>

          <h1 className="text-center">WELCOME TO LINKEDIN!</h1>
          {this.state.wrongPass && (
            <Alert color="danger">The Email/password is incorrect!</Alert>
          )}
          <Form onSubmit={this.getCredentials}>
            <Input
              className="login-input"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />

            <Input
              className="login-input"
              type="password"
              placeholder="Password (6 or more characters)"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              />

            <Container>
              <label className="pull-left checkbox-inline">
                <input check
                  type="checkbox"
                  value={this.state.saveCredentials}
                  onClick={e =>
                    this.setState({
                      saveCredentials: !this.state.saveCredentials
                    })
                  }
                  />{" "}
                Keep me signed in
              </label>
            </Container>
            <Input className="btn btn-primary" type="submit" value="Log In" />
          </Form>
          <p className="text-center">
            <small>Don't have an account yet? </small>
            <Link to="/register" className="font-weight-bolder">
              Create an Account
            </Link>
          </p>

          <div className="text-center">
            <a
              href="http://app-be.azurewebsites.net/auth/facebook"
              className="btn btn-primary">
              Login With Facebook
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
