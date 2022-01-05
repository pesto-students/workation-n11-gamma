import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Offcanvas,
  Button,
} from "react-bootstrap";
import { withRouter } from "../shared-resource/store/withRouter";
import { userContext } from "../shared-resource/Contexts/User_Context";
import logo from "../shared-resource/images/Workation_2x.png";
import "./headerbar.css";

function HeaderBar(props) {
  const usersAuth = useContext(userContext);

  function pleaseLogout() {
    props.authorize_user_logout();
  }

  function customerLogin() {
    props.router.navigate("/customer/login");
  }

  function guestLogin() {
    props.registerGuest();
  }

  return (
    <header className="app-background main-header-top w-100">
      <Container className="header-top-container" fluid>
        <Row className="gx-0">
          <Col className=" text-white logo-div" xs={3} md={1}>
            <Link to="/">
              {" "}
              <img src={logo} alt="work@tion" className="logo-iamge" />
            </Link>
          </Col>
          <Col className="navbar-div" xs={9} md={10}>
            <Navbar className="navbar-main-top" expand={false}>
              <Container
                className="justify-content-end justify-content-md-center"
                fluid
              >
                <Nav className=" navs-list d-none d-md-flex flex-md-row pl-md-2">
                  <Link className="navbar-links top-links " to="/">
                    Home
                  </Link>
                  {usersAuth?.isHost ? null : (
                    <Link
                      className="navbar-links top-links"
                      to="/customer/findcities"
                    >
                      Cities
                    </Link>
                  )}
                  {usersAuth?.isHost ? null : (
                    <Link
                      className="navbar-links top-links"
                      to="/customer/findHotels"
                    >
                      Hotels
                    </Link>
                  )}
                  <Link className="navbar-links top-links" to="/about-us">
                    About us
                  </Link>
                  <Link className="navbar-links top-links" to="/contact-us">
                    Contact us
                  </Link>
                  <div className=" login-signup-button">
                    {usersAuth?.isLogin ? (
                      <>
                        <Button
                          className="signout-header-button"
                          onClick={pleaseLogout}
                        >
                          SIGNOUT
                        </Button>
                        {/* {usersAuth?.isCustomer ? (
                          <Button
                            className="signin-header-button"
                            onClick={guestLogin}
                          >
                            Customer PRofile
                          </Button>
                        ) : usersAuth?.isHost ? (
                          <Button
                            className="signin-header-button"
                            onClick={guestLogin}
                          >
                            Host PRofile
                          </Button>
                        ) : null} */}
                      </>
                    ) : null}
                    {usersAuth?.isLogin ? null : (
                      <>
                        <Button
                          className="login-header-button book-login"
                          onClick={customerLogin}
                        >
                          LOGIN
                        </Button>
                      </>
                    )}
                  </div>
                </Nav>
                <Navbar.Toggle
                  className="d-md-none toggle-hamburger"
                  aria-controls="offcanvasNavbar"
                  data-bs-toggle="offcanvas"
                >
                  <span className="toggle-arrow">&rarr;</span>
                </Navbar.Toggle>
                <Navbar.Offcanvas
                  id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel"
                  placement="end"
                  className="right-panel d-md-none"
                >
                  <Offcanvas.Header className="right-panel-top" closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">
                      Work@tion
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Link className="navbar-links" to="/">
                        Home
                      </Link>
                      <Link className="navbar-links" to="/customer/findcities">
                        Cities
                      </Link>
                      <Link className="navbar-links" to="/customer/findHotels">
                        Hotels
                      </Link>
                      <Link className="navbar-links" to="/about-us">
                        About us
                      </Link>
                      <Link className="navbar-links" to="/contact-us">
                        Contact us
                      </Link>
                      <div className=" login-signup-button">
                        {usersAuth?.isLogin ? (
                          <>
                            <Button
                              className="signout-header-button"
                              onClick={pleaseLogout}
                            >
                              SIGNOUT
                            </Button>
                            {usersAuth?.isCustomer ? (
                              <Button
                                className="signin-header-button"
                                onClick={guestLogin}
                              >
                                Customer PRofile
                              </Button>
                            ) : usersAuth?.isHost ? (
                              <Button
                                className="signin-header-button"
                                onClick={guestLogin}
                              >
                                Host PRofile
                              </Button>
                            ) : null}
                          </>
                        ) : null}
                        {usersAuth?.isLogin ? null : (
                          <>
                            <Button
                              className="login-header-button book-login"
                              onClick={customerLogin}
                            >
                              LOGIN
                            </Button>
                          </>
                        )}
                      </div>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          </Col>
          <Col className="right-div" xs={0} md={1}></Col>
        </Row>
      </Container>
    </header>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    authorized_user_login: states.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authorize_user_logout: () =>
      dispatch({
        type: "LOGOUT_AUTHORIZE",
      }),
    registerGuest: () =>
      dispatch({
        type: "LOAD_CUSTOMER_LOGIN",
        payload: {
          email: "guest@gmail.com",
          password: "12345",
          usertype: "CUSTOMER",
        },
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(HeaderBar)
);
