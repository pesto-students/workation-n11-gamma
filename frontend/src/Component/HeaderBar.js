import React,{ useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {Container, Row, Col, Navbar, Nav, Offcanvas, Button} from 'react-bootstrap'
import {withRouter} from '../shared-resource/store/withRouter';
import { userContext } from '../shared-resource/Contexts/User_Context';
import logo from "../shared-resource/images/Workation_2x.png"
import "./headerbar.css"

function HeaderBar(props){
      const usersAuth = useContext(userContext);
      
    const [selectloginUser, ChangeSelectLoginUser] = useState(false);
    const [selectSignupUser, ChangeSelectSignupUser] = useState(false);

    useEffect(() => {
        
    }, [selectloginUser,selectSignupUser]);
    
    function pleaseLogout(){
        props.authorize_user_logout()
    }

    function forWhichLogin() {
        ChangeSelectLoginUser(true);
        ChangeSelectSignupUser(false);
        // props.router.navigate("/customer/login")
    }

    function customerLogin() {
        // ChangeSelectLoginUser(true);
        props.router.navigate("/customer/login")
    }

    function hostLogin() {
        // ChangeSelectLoginUser(true);
        props.router.navigate("/host/login")
    }

    function customerSignup() {
        // ChangeSelectLoginUser(true);
        props.router.navigate("/customer/signup")
    }

    function hostSignup() {
        // ChangeSelectLoginUser(true);
        props.router.navigate("/host/signup")
    }

    function forWhichSignup() {
        ChangeSelectSignupUser(true)
        ChangeSelectLoginUser(false);

        // props.router.navigate("/customer/signup")
    }

    function guestLogin(){
        props.registerGuest();
    }

    
    return (
        <div className="app-background main-header-top">
        <Container className="header-top-container" fluid >
            <Row className="gx-0">
                <Col className=" text-white logo-div" xs={1}>
                    <Link to="/"> <img src={logo} alt="work@tion" className="logo-iamge" /></Link>
                </Col>
                <Col className="navbar-div" xs={10}>
                <Navbar className="navbar-main-top" expand={false}>
                    <Container className="justify-content-center" fluid>
                        <Nav className=" navs-list d-none d-md-flex flex-md-row pl-md-2 ">
                            <Link className="navbar-links" to="/">Home</Link>
                            <Link className="navbar-links" to="/customer/login">Cities</Link>
                            <Link className="navbar-links" to="/host/login">Hotels</Link>
                            <Link className="navbar-links" to="/admin/login">About us</Link>
                                    <Link className="navbar-links" to="/admin/login">Contact us</Link>
                            <div className=" login-signup-button flex-grow-1">       
                            {
                                usersAuth?.isLogin ?
                                <>
                                <Button className='signout-header-button' onClick={pleaseLogout}>SIGNOUT</Button>
                                <Button className='signin-header-button' onClick={guestLogin}>User PRofile</Button> 
                                </>
                                :
                                null
                            }
                            {
                                usersAuth?.isLogin ?
                                
                                null :
                                (
                                    <>
                                                        {   !selectloginUser ?
                                                            <Button className='login-header-button' onClick={forWhichLogin}>LOGIN</Button>
                                                            : <>
                                                            <Button className='login-header-button' onClick={customerLogin}>CUSTOMER</Button>
                                                            <Button className='login-header-button' onClick={hostLogin}>HOST</Button>
                                                            </>
                                                        }
                                                        {
                                                            !selectSignupUser ?
                                                                <Button className='signin-header-button' onClick={forWhichSignup}>SIGNUP</Button>
                                                                :
                                                                <>
                                                                <Button className='signin-header-button' onClick={customerSignup}>CUSTOMER</Button>
                                                                <Button className='signin-header-button' onClick={hostSignup}>HOST</Button> 
                                                                </>   
                                                        }
                                                        <Button className='signin-header-button' onClick={guestLogin}>GuestLogin</Button> 
                                        
                                    </>
                                                              
                                )
                                    }

                            </div> 
                            
                        </Nav>
                <Navbar.Toggle className="d-md-none toggle-hamburger" aria-controls="offcanvasNavbar" >
                    <span className="toggle-arrow">
                        &rarr;
                    </span>
                    </Navbar.Toggle>
                        <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className="right-panel d-md-none"
                        >
                        <Offcanvas.Header className="right-panel-top" closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Work@tion</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link className="navbar-links" to="/">Home</Link>
                            <Link className="navbar-links" to="/customer/login">Cities</Link>
                            <Link className="navbar-links" to="/host/login">Hotels</Link>
                            <Link className="navbar-links" to="/admin/login">About us</Link>
                            <Link className="navbar-links" to="/admin/login">Contact us</Link>
                            {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item to="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item to="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="#action5">
                                Something else here
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>
                        </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        </Container>
                        </Navbar>

                </Col>
                <Col className="right-div" xs={1}>
                    
                </Col>
            </Row>
        </Container>
  </div>
    )
}


const mapStatesToProps = (states,props)=>{
    return {
        authorized_user_login: states.app.user
    }
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
        authorize_user_logout : () => dispatch({
            type: 'LOGOUT_AUTHORIZE'
        }),
        registerGuest : () => dispatch({
            type: 'LOAD_CUSTOMER_LOGIN',
            payload: {
                email: 'Rishabhv47@gmail.com',
                password: '1234'
            }
        })
    }
  }

export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(HeaderBar));
