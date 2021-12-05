import './App.css';
import {HeaderBar} from './Component/HeaderBar';
import {FooterBar} from './Component/FooterBar'
import {RouteSection} from './Component/RouteSection';
import {connect} from "react-redux";
import {userContext} from "./shared-resource/Contexts/User_Context"
// import {Routes} from 'react-router-dom';

function App() {
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
  return (
    <div className="main-app">
      <userContext.Provider value={contextValue}>
        <HeaderBar/>
          <RouteSection/>
        <FooterBar/>
      </userContext.Provider>

    </div>
  );
}


const mapStatesToProps = (states,props)=>{

  return {
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
  }
}


export default connect(mapStatesToProps,mapDispatchToProps)(App);
