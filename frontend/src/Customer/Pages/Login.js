import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../shared-resource/store/withRouter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Component/Loader";
import "./login.css";

function Login(props) {
  toast.configure();
  const [emailAddress, changeEmailAddress] = useState("");
  const [userPassword, changeUserPassword] = useState("");

  const userType = "CUSTOMER";
  const notify = async () => {
    toast.error("Required email and password !", { theme: "dark" });
  };

  const notifyEmailError = async () => {
    toast.error("Email address is not correct !", { theme: "dark" });
  };

  useEffect(() => {
    document.title = "Work@tion-Login-Customer";
  }, [emailAddress, userPassword]);

  function changeEmailFieldValue(e) {
    changeEmailAddress(e.target.value);
  }

  function changePasswordFieldValue(e) {
    changeUserPassword(e.target.value);
  }

  function submitLogin(e) {
    e.preventDefault();
    if (!emailAddress || !userPassword) {
      notify();
    } else {
      let lastAtPos = emailAddress.lastIndexOf("@");
      let lastDotPos = emailAddress.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          emailAddress.indexOf("@@") === -1 &&
          lastDotPos >= 2 &&
          emailAddress.length - lastDotPos > 2
        )
      ) {
        notifyEmailError();
      } else {
        props.load_login_user(emailAddress, userPassword, userType);
      }
    }
  }

  return (
    <div className="main-customer-login">
      {props?.authorized_user_login?.status === "Initiated" ? <Loader /> : null}
      <Container className="login-image-container" fluid>
        <Row>
          <Col className="customer-login-image-background" xs={12}>
            <Container className="customer-login-container-panel" fluid>
              <div className="panel-main-div">
                <div className="main-div-parent">
                  <div className="login-form">
                    <div className="sign-in-heading">Sign In</div>
                    <Form className="customer-login-form">
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
                          required
                        />
                      </Form.Group>

                      <Form.Text className=" forget-password-text text-muted">
                        <Link to="" className="link-text">
                          Forgot Password !
                        </Link>
                      </Form.Text>

                      <Button
                        className="login-button"
                        variant="primary"
                        type="button"
                        onClick={submitLogin}
                      >
                        Login &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {<span className="arrow-inline">&rarr;</span>}
                      </Button>

                      <Form.Text className=" sign-up-text ">
                        Don't have an account ?
                        <Link to="/customer/signup" className="link-text">
                          &nbsp;Sign Up
                        </Link>
                      </Form.Text>
                    </Form>
                  </div>
                  <div className="login-image-customer"></div>
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
    load_login_user: (email, password, usertype) =>
      dispatch({
        type: "LOAD_CUSTOMER_LOGIN",
        payload: { email, password, usertype },
      }),
  };
};

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(Login));
