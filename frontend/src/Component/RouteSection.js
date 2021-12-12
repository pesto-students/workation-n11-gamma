import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import {NotFound} from './NotFound';
import CustomerLogin from '../Customer/Pages/Login';
import {SignUp as CustomerSignUp} from '../Customer/Pages/SignUp';
import {Login as HostLogin} from '../Host/Pages/Login';
import {SignUp as HostSignUp} from '../Host/Pages/SignUp';
import {Login as AdminLogin} from '../Admin/Pages/Login';
import {SignUp as AdminSignUp} from '../Admin/Pages/SignUp';
import {withRouter} from '../shared-resource/store/withRouter'
import HotelAvailable from '../Customer/Pages/HotelAvailable';
import history from '../shared-resource/store/history';
import FindCity from '../Customer/Pages/Find_city'

import {connect} from "react-redux";

function RouteSection(props){
 
    // useEffect(()=>{
    //     if (props?.authorized_user_login?.user?.isLogin || props?.authorized_user_login?.user?.isLogout){
    //         props.router.navigate("/")
    //     }  
    // },[props?.authorized_user_login?.user?.isLogin,props?.authorized_user_login?.user?.isLogout])
    
    
    return (
        <div>
            <Routes history={history} >
                <Route path="/" element={<LandingPage/>} exact/>
                <Route path="/customer/login" element={<CustomerLogin/>}/>
                <Route path="/customer/signup" element={<CustomerSignUp/>}/>
                <Route path="/host/login" element={<HostLogin/>}/>
                <Route path="/host/signup" element={<HostSignUp/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin/signup" element={<AdminSignUp/>}/>
                <Route path="/customer/:cityName" element={<FindCity/>}/>
                <Route path="/customer/hotel/:id" element={<HotelAvailable/>}/>
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