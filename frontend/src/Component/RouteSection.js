import React, { useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import {LandingPage} from './LandingPage';
import {NotFound} from './NotFound';
import CustomerLogin from '../Customer/Pages/Login';
import {SignUp as CustomerSignUp} from '../Customer/Pages/SignUp';
import {Login as HostLogin} from '../Host/Pages/Login';
import {SignUp as HostSignUp} from '../Host/Pages/SignUp';
import {Login as AdminLogin} from '../Admin/Pages/Login';
import {SignUp as AdminSignUp} from '../Admin/Pages/SignUp';
import {withRouter} from '../shared-resource/store/withRouter'
import {connect} from "react-redux";

function RouteSection(props){
 
    useEffect(()=>{
        if (props?.authorized_user_login?.user?.isLogin === true || props?.authorized_user_login?.user?.isLogout){
            props.router.navigate("/")
        }  
    },[props?.authorized_user_login?.user?.isLogin,props?.authorized_user_login?.user?.isLogout])
    
    
    return (
        <div>
            <Routes >
                <Route path="/" element={<LandingPage/>} exact/>
                <Route path="/customer/login" element={<CustomerLogin/>}/>
                <Route path="/customer/signup" element={<CustomerSignUp/>}/>
                <Route path="/host/login" element={<HostLogin/>}/>
                <Route path="/host/signup" element={<HostSignUp/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin/signup" element={<AdminSignUp/>}/>
                {/* <Route path="" element={}/>
                <Route path="" element={}/>
                <Route path="" element={}/>
                <Route path="" element={}/>
                <Route path="" element={}/>
                <Route path="" element={}/> */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
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
    }
  }
  
export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(RouteSection));