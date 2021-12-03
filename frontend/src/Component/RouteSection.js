import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {LandingPage} from './LandingPage';
import {NotFound} from './NotFound';
import {Login as CustomerLogin} from '../Customer/Pages/Login';
import {SignUp as CustomerSignUp} from '../Customer/Pages/SignUp';
import {Login as HostLogin} from '../Host/Pages/Login';
import {SignUp as HostSignUp} from '../Host/Pages/SignUp';
import {Login as AdminLogin} from '../Admin/Pages/Login';
import {SignUp as AdminSignUp} from '../Admin/Pages/SignUp';

function RouteSection(){
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
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

export {RouteSection};