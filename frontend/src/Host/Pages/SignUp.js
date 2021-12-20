import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../shared-resource/store/withRouter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import "./login.css";

function SignUp(props) {
  toast.configure();
  const [emailAddress, changeEmailAddress] = useState("");
  const [userPassword, changeUserPassword] = useState("");
  const [username, changeUsername] = useState("");
  const [userReEnterPassword, changeUserReEnterPassword] = useState("");
  const [isPasswordSame, changeIsPasswordSame] = useState(true);

  const userType = "HOST";
  const notifyEmail = async () => {
    toast.error("Required Email!", { theme: "dark" });
  };

  const notifyUserName = async () => {
    toast.error("Required Name!", { theme: "dark" });
  };

  const notifyPassword = async () => {
    toast.error("Required Password in both fields!", { theme: "dark" });
  };

  const notifyEmailError = async () => {
    toast.error("Email address is not correct !", { theme: "dark" });
  };

  const notifyPasswordSame = async () => {
    toast.error("Password must be same!", { theme: "dark" });
  };

  useEffect(() => {
    document.title = "Work@tion-Login-Host";
  }, [
    emailAddress,
    userPassword,
    userReEnterPassword,
    username,
    isPasswordSame,
  ]);

  function changeEmailFieldValue(e) {
    changeEmailAddress(e.target.value);
  }

  function changePasswordFieldValue(e) {
    changeUserPassword(e.target.value);
  }

  function changeNameFieldValue(e) {
    changeUsername(e.target.value);
  }

  function changeReEnterPasswordFieldValue(e) {
    changeUserReEnterPassword(e.target.value);
  }

  function reEnterFocused(e) {
    // console.log('focused');
    if (userPassword === userReEnterPassword) {
      changeIsPasswordSame(true);
    } else {
      changeIsPasswordSame(false);
    }
  }

  function reEnterMouseLeave(e) {
    if (userPassword === userReEnterPassword) {
      changeIsPasswordSame(true);
    } else {
      changeIsPasswordSame(false);
    }
  }

  function submitLogin(e) {
    e.preventDefault();
    let lastAtPos = emailAddress.lastIndexOf("@");
    let lastDotPos = emailAddress.lastIndexOf(".");
    if (!username) {
      notifyUserName();
    } else if (!emailAddress) {
      notifyEmail();
    } else if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        emailAddress.indexOf("@@") === -1 &&
        lastDotPos >= 2 &&
        emailAddress.length - lastDotPos > 2
      )
    ) {
      notifyEmailError();
    } else if (!userPassword || !userReEnterPassword) {
      notifyPassword();
    } else if (userPassword !== userReEnterPassword) {
      notifyPasswordSame();
    } else {
      // console.log('loading props');
      props.load_signup_host({
        emailAddress,
        userPassword,
        username,
        userType,
      });
    }
  }

  return (
    <div className="main-host-login">
      {props?.authorized_user_login?.status === "Initiated" ? <Loader /> : null}

      <Container className="login-image-container" fluid>
        <Row>
          <Col className="host-login-image-background" xs={12}>
            <Container className="host-login-container-panel" fluid>
              <div className="panel-main-div">
                <div className="main-div-parent">
                  <div className="login-form">
                    <div className="sign-in-heading">Sign Up</div>
                    <Form className="host-login-form">
                      <Form.Group
                        className="email-group mb-3"
                        controlId="formBasicUsername"
                      >
                        {/* <Form.Label className="email-label">Email address</Form.Label> */}
                        <Form.Control
                          className="username-input"
                          type="text"
                          placeholder="Name"
                          value={username}
                          onChange={changeNameFieldValue}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="email-group mb-3"
                        controlId="formBasicEmail"
                      >
                        {/* <Form.Label className="email-label">Email address</Form.Label> */}
                        <Form.Control
                          className="email-input"
                          type="email"
                          placeholder="Email"
                          value={emailAddress}
                          onChange={changeEmailFieldValue}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="password-group mb-3"
                        controlId="formBasicPassword"
                      >
                        {/* <Form.Label className="password-label">Password</Form.Label> */}
                        <Form.Control
                          className="password-input"
                          type="password"
                          placeholder="Password"
                          value={userPassword}
                          onChange={changePasswordFieldValue}
                          onKeyDown={reEnterFocused}
                          onKeyUp={reEnterMouseLeave}
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="reenterpassword-group mb-3"
                        controlId="formBasicReEnterPassword"
                      >
                        {/* <Form.Label className="password-label">Password</Form.Label> */}
                        <Form.Control
                          className="reenterpassword-input"
                          type="password"
                          placeholder="Re-enter Password"
                          value={userReEnterPassword}
                          onChange={changeReEnterPasswordFieldValue}
                          onKeyDown={reEnterFocused}
                          onKeyUp={reEnterMouseLeave}
                          required
                        />
                      </Form.Group>
                      {isPasswordSame ? null : (
                        <Form.Text className="text-white font-bold">
                          ! Both the password must be same.
                        </Form.Text>
                      )}

                      <Form.Text className=" sign-up-text">
                        Already have an account ?
                        <Link to="/host/login" className="link-text">
                          &nbsp;Log in
                        </Link>
                      </Form.Text>

                      <Button
                        className="login-button"
                        variant="primary"
                        type="button"
                        onClick={submitLogin}
                      >
                        Sign up &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {<span className="arrow-inline">&rarr;</span>}
                      </Button>
                    </Form>
                  </div>
                  <div className="login-image"></div>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    authorized_user_login: states.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_signup_host: (payload) =>
      dispatch({
        type: "LOAD_CUSTOMER_SIGNUP",
        payload: payload,
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(SignUp)
);
