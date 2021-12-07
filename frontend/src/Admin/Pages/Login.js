import React from "react";
import {Link} from 'react-router-dom'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import "./login.css"

function Login() {
    return(
        <div className="main-admin-login">
              <Container className="login-image-container" fluid >
                  <Row>
                      <Col className="admin-login-image-background" xs={12}>
                          <Container className="admin-login-container-panel" xs={12} fluid>
                              <div className="panel-main-div">
                                  <div className="main-div-parent">
                                       <div className="login-form">
                                           <div className="sign-in-heading">
                                                Sign In
                                           </div>
                                        <Form className="admin-login-form">

                                        <Form.Group className="email-group mb-3" controlId="formBasicEmail">
                                        <Form.Label className="email-label">Email address</Form.Label>
                                        <Form.Control className = "email-input" type="email" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="password-group mb-3" controlId="formBasicPassword">
                                        <Form.Label className="password-label">Password</Form.Label>
                                        <Form.Control className="password-input" type="password" placeholder="" />
                                        </Form.Group>

                                        <Form.Text className=" forget-password-text text-muted">
                                        <Link to="" className="link-text">
                                        Forgot Password !
                                        </Link>
                                        </Form.Text>
                                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group> */}

                                        <Button className="login-button" variant="primary" type="submit">
                                        Login &nbsp;&nbsp;&nbsp;&nbsp; {<span className="arrow-inline">&rarr;</span>}
                                        </Button>
                                        
                                        <Form.Text className=" sign-up-text text-muted">
                                        Don't have an account ? 
                                        <Link to="/admin/signup" className="link-text">
                                            &nbsp;Sign Up
                                        </Link>
                                        </Form.Text>
                                        </Form>
                                       </div>
                                       <div className="login-image-admin">
                                       </div>
                                  </div>
                              </div>
                          </Container>
                      </Col>
                  </Row>
              </Container>
        </div>
    )
}

export {Login}