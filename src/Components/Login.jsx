import React, { Component } from "react";
import { Alert, Form, Input, Container, Row, Fade } from "reactstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginWithThunk } from "../action/index";
import LoginAPI from "../APIs/LoginAPI";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUserToken: (t, u) => dispatch(loginWithThunk(t, u)),
});
// const mapDispatchToProps = dispatch => ({
//   setUserToken: base64 =>
//     dispatch({
//       type: "SET_USERBASE64",
//       payload:{
//         token: base64,
//         user: base64.user.username
//       }
//     })
// });

class Login extends Component {
  state = {
    email: "",
    password: "",
    logged: undefined,
    wrongPass: false,
    isLoading: true,
    signup: false,
    saveCredentials: false,
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

  getCredentials = async (e) => {
    e.preventDefault();
    //create my "token" starting from username and password
    //contact the APIs to prove identity
    let obj = {
      email: this.state.email,
      password: this.state.password,
    };
    const respJson = await LoginAPI(obj);
    if (respJson) {
      console.log(respJson);
      if (this.state.saveCredentials) {
        this.props.setUserToken(respJson.access_token, respJson.user.username);
        localStorage.setItem("access_token", respJson.access_token);
        localStorage.setItem("username", respJson.user.username);
        localStorage.setItem("userId", respJson.user._id);
      } else {
        sessionStorage.setItem("access_token", respJson.access_token);
        sessionStorage.setItem("username", respJson.user.username);
        sessionStorage.setItem("userId", respJson.user._id);
        this.props.setUserToken(respJson.access_token, respJson.user.username);
      }
      // <Redirect to={{pathname:"/login" }}/>
      this.props.history.push("/newsfeed");

      this.props.removeIsLoading();
    } else {
      //console log
      this.setState({
        wrongPass: true,
        email: "",
        password: "",
      });
    }
  };

  render() {
    console.log(this.props.match.params.redirect || "newsfeed");
    if (this.props.details.userToken) {
      return <Redirect to="/newsfeed" />;
    }

    // return <Redirect to={{pathname:"/"+ (this.props.match.params.redirect || "newsfeed") }} />
    return (
      <div className="login-form mx-auto mt-5">
        <Container>
          <Row>
            <img
              className="mx-auto img-fluid"
              style={{ display: "block", width: "45vmin" }}
              // width="30%"
              src="https://www.netclipart.com/pp/m/200-2006277_linkedin-clipart-transparent-linkedin-logo-png-hd.png"
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
              onChange={(e) => this.setState({ email: e.target.value })}
            />

            <Input
              className="login-input"
              type="password"
              placeholder="Password (6 or more characters)"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />

            <Container>
              <label className="pull-left checkbox-inline">
                <input
                  check="true"
                  type="checkbox"
                  value={this.state.saveCredentials}
                  onClick={(e) =>
                    this.setState({
                      saveCredentials: !this.state.saveCredentials,
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
              href="https://be-lnk.herokuapp.com/auth/facebook"
              className="btn btn-primary text-white"
            >
              <span className="fa spanbutton"> &#xf09a;</span> &nbsp;{" "}
              <span className=" spanbutton">Login With Facebook</span>
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
