import React,{ useContext } from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {Container, Row, Col, Navbar, Nav, Offcanvas, Button} from 'react-bootstrap'
import {withRouter} from '../shared-resource/store/withRouter';
import { userContext } from '../shared-resource/Contexts/User_Context';
import "./headerbar.css"

function HeaderBar(props){
      const usersAuth = useContext(userContext);

    function pleaseLogout(){
        props.authorize_user_logout()
    }

    function pleaseLogin(){
        props.router.navigate("/customer/login")
    }

    function pleaseSignin(){
        props.router.navigate("/customer/signin")
    }

    function guestLogin(){
        props.registerGuest();
    }
    
    return (
        <div className="app-background main-header-top">
        <Container className="header-top-container" fluid >
            <Row className="gx-0">
                <Col className=" text-white logo-div" xs={1}>
                    Logo
                </Col>
                <Col className="navbar-div" xs={10}>
                <Navbar className="navbar-main-top" expand={false}>
                    <Container className="justify-content-end"fluid>
                        <Nav className=" me-auto navs-list d-none d-md-flex flex-md-row pl-md-2">
                            <Link className="navbar-links" to="/">Home</Link>
                            <Link className="navbar-links" to="/customer/login">Link</Link>
                            <Link className="navbar-links" to="/host/login">Link</Link>
                            <Link className="navbar-links" to="/admin/login">Link</Link>
                            
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item to="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item to="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item to="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item to="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                            {
                                usersAuth?.isLogin ?
                                <Button variant='secondary' onClick={pleaseLogout}>SIGNOUT</Button> :
                                (<><Button variant='secondary' onClick={pleaseLogin}>LOGIN</Button>
                                <Button variant='secondary' onClick={pleaseSignin}>SIGNIN</Button>
                                <a className='btn btn-secondary' onClick={guestLogin}>GuestLogin</a></>
                                
                                )
                            }
                            
                            
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
                            <Link className="navbar-links-panel" to="/">Home</Link>
                            <Link className="navbar-links-panel" to="/customer/login">Link</Link>
                            <Link className="navbar-links-panel" to="/host/login">Link</Link>
                            <Link className="navbar-links-panel" to="/admin/login">Link</Link>
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
