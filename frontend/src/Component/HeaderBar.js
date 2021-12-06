import React from 'react';
// import {userContext} from "../shared-resource/Contexts/User_Context"
import {Link} from 'react-router-dom'
import {connect} from "react-redux";


function HeaderBar({authorize_user_login}){
    //   const users = useContext(userContext);
    //  console.log(users);
    //Object.is
    function loginUser(e){
        authorize_user_login();
    }
    return (
        <div>
             Hi I am Header!
             <Link to="/customer/login">Login CUstomer</Link>
             <input type="button" name="login" onClick={loginUser} value="Login"/>
        </div>
    )
}


const mapStatesToProps = (states,props)=>{
    return {
      
    }
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
        authorize_user_login : () => dispatch({
            type: 'LOGIN_AUTHORIZE'
        })
    }
  }
  
  
export default connect(mapStatesToProps,mapDispatchToProps)(HeaderBar);
// export {HeaderBar};