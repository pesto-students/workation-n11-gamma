import React,{useState,useEffect} from 'react';
import './App.css';
import HeaderBar from './Component/HeaderBar';
import {FooterBar} from './Component/FooterBar'
import {RouteSection} from './Component/RouteSection';
import {connect} from "react-redux";
import {userContext} from "./shared-resource/Contexts/User_Context"

function App(props) {
  const contextValue = {
        isLogin: false,
        userEmail: '',
        userName: '',
        userPassword: '',
        isLogout: true,
        isAdmin : false,
        isCustomer: false,
        isHost: false,
        userId: ''
  }

  const [userObj, changeUserObj] = useState(contextValue);

  useEffect(()=>{
    
    document.title = 'Work@tion-Home'
    
  },[userObj])

  function resetUser(){
    changeUserObj({
      contextValue
    })
  }

  if (userObj && props.authorized_user_login && props.authorized_user_login.user && props.authorized_user_login.user.isLogin !== userObj.isLogin){
    const response = props.authorized_user_login.user;
    changeUserObj({
      ...response
    })
  }



  return (
    <div className="main-app">
      <userContext.Provider value={userObj}>
        <HeaderBar/>
          <RouteSection/>
        <FooterBar/>
      </userContext.Provider>

    </div>
  );
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


export default connect(mapStatesToProps,mapDispatchToProps)(App);
