import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {connect} from "react-redux";
import {withRouter} from '../../shared-resource/store/withRouter'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Component/Loader";
import "./signup.css"

function SignUp(props) {

    toast.configure()
    const [emailAddress,changeEmailAddress] = useState('');
    const [userPassword, changeUserPassword] = useState('');
    const [username, changeUsername] = useState('');
    const [userReEnterPassword, changeUserReEnterPassword] = useState('');
    const [isPasswordSame,changeIsPasswordSame] = useState(true);

    const userType = 'Customer';
    const notifyEmail = async () => {
        toast.error("Required Email!",{theme: 'dark'})
    }

    const notifyUserName = async () => {
        toast.error("Required Name!",{theme: 'dark'})
    }

    const notifyPassword = async () => {
        toast.error("Required Password in both fields!",{theme: 'dark'})
    }

    const notifyEmailError = async () => {
        toast.error("Email address is not correct !",{theme: 'dark'})
    }

    const notifyPasswordSame = async () => {
        toast.error("Password must be same!",{theme: 'dark'})
    }
    

    useEffect(()=>{
        document.title = 'Work@tion-Signup-Customer';
    },[emailAddress,userPassword,userReEnterPassword,username,isPasswordSame]);


    function changeEmailFieldValue(e){        
        changeEmailAddress(e.target.value)
    }

    function changePasswordFieldValue(e){
        changeUserPassword(e.target.value)
    }

    function changeNameFieldValue(e) {
        changeUsername(e.target.value)
    }

    function changeReEnterPasswordFieldValue(e) {
        changeUserReEnterPassword(e.target.value)
    }

    function reEnterFocused(e) {
        // console.log('focused');
        if (userPassword === userReEnterPassword) {
            changeIsPasswordSame(true)
        } else {
            changeIsPasswordSame(false)
        }
    }

    function reEnterMouseLeave(e) {
        if (userPassword === userReEnterPassword) {
            changeIsPasswordSame(true)
        } else {
            changeIsPasswordSame(false)
        }
    }

    function submitLogin(e){
        e.preventDefault();
        let lastAtPos = emailAddress.lastIndexOf("@");
        let lastDotPos = emailAddress.lastIndexOf(".");
        if (!username) {
            notifyUserName()
        } else 
        if (!emailAddress ) {
              notifyEmail()
        } else if (
        !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            emailAddress.indexOf("@@") === -1 &&
            lastDotPos >= 2 &&
            emailAddress.length - lastDotPos > 2
        )
        ) {
        notifyEmailError()
        }
        else
        if (!userPassword || !userReEnterPassword) {
              notifyPassword()
        }
        else 
        if (userPassword !== userReEnterPassword) {
              notifyPasswordSame()
        }
        else {  
            // console.log('loading props');
            props.load_signup_user({ emailAddress, userPassword, username });  
        }
    }

        return(
            <div className="main-customer-signup">
                {
                    props?.authorized_user_login?.status === 'Initiated'?
                    <Loader/> : null
                }
                  <Container className="signup-image-container" fluid >
                      <Row>
                          <Col className="customer-signup-image-background" xs={12}>
                              <Container className="customer-signup-container-panel" fluid>
                                  <div className="panel-main-signup-div">
                                      <div className="main-div-signup-parent">
                                           <div className="login-form">
                                               <div className="sign-in-heading">
                                                    Sign Up
                                               </div>
                                            <Form className="customer-signup-form">
    
                                            <Form.Group className="username-group mb-3" controlId="formBasicUsername">
                                            <Form.Control className = "username-input" type="text" placeholder="Name" value={username} onChange={changeNameFieldValue} required/>
                                            </Form.Group>
                                                
                                            <Form.Group className="email-group mb-3" controlId="formBasicEmail">
                                            <Form.Control className = "email-input" type="email" placeholder="Email" value={emailAddress} onChange={changeEmailFieldValue} required/>
                                            </Form.Group>
    
                                            <Form.Group className="password-group mb-3" controlId="formBasicPassword">
                                                    <Form.Control className="password-input"
                                                        type="password"
                                                        placeholder="Password"
                                                        value={userPassword}
                                                        onChange={changePasswordFieldValue}
                                                        onKeyDown={reEnterFocused}
                                                        onKeyUp={reEnterMouseLeave}
                                                        required />
                                            </Form.Group>
                                                
                                            <Form.Group className="reenterpassword-group mb-3" controlId="formBasicResetPassword">
                                                    <Form.Control className="reenterpassword-input"
                                                        type="password"
                                                        placeholder="Re-enter Password"
                                                        value={userReEnterPassword}
                                                        onChange={changeReEnterPasswordFieldValue}
                                                        onKeyDown={reEnterFocused}
                                                        onKeyUp={reEnterMouseLeave}
                                                        required />
                                                </Form.Group>
                                                {isPasswordSame ?
                                                    null :
                                                    <Form.Text className="text-white font-bold">
                                                        ! Both the password must be same.
                                                    </Form.Text>
                                                }
     
                                            <Form.Text className=" sign-up-text">
                                            Already have an account ? 
                                            <Link to="/customer/login" className="link-text">
                                                &nbsp;Log in
                                            </Link>
                                            </Form.Text> 
                                                
                                                <Button className="signup-button"  type="button"
                                                    onClick={submitLogin} 
                                                >
                                            Sign up &nbsp;&nbsp;&nbsp;&nbsp; {<span className="arrow-inline">&rarr;</span>}
                                            </Button>
                                            
                                            </Form>
                                           </div>
                                           <div className="login-image-customer">
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

const mapStatesToProps = (states,props)=>{
    return {
          authorized_user_login: states.app.user
    }
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
        load_signup_user : (payload) => dispatch({
            type:"LOAD_CUSTOMER_SIGNUP",
            payload: payload
        })
    }
  }
  
export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(SignUp));
  