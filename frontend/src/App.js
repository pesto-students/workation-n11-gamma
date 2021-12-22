/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import HeaderBar from "./Component/HeaderBar";
import { FooterBar } from "./Component/FooterBar";
import RouteSection from "./Component/RouteSection";
import { connect } from "react-redux";
import { userContext } from "./shared-resource/Contexts/User_Context";
import { withRouter } from "./shared-resource/store/withRouter.js";
import { useLocation } from "react-router";
import Loader from "./Component/Loader";
import "./App.css";

function App(props) {
  const contextValue = {
    isLogin: false,
    userEmail: "",
    userName: "",
    userPassword: "",
    isLogout: true,
    isAdmin: false,
    isCustomer: false,
    isHost: false,
    userId: "",
    token: "",
  };

  const [userObj, changeUserObj] = useState(contextValue);
  const [locationRef, changeLocationRef] = useState(false);

  useEffect(() => {
    props.updateUser();
  }, []);

  useEffect(() => {
    document.title = "Work@tion-Home";
  }, [props.authorized_user_login.user, userObj]);

  useEffect(() => {
    const isLoginSignupArray = props.router.location.pathname.split("/");
    const isLoginSignup =
      isLoginSignupArray.indexOf("login") >= 0 ||
      isLoginSignupArray.indexOf("signup") >= 0;

    if (isLoginSignup) {
      changeLocationRef(true);
    } else if (!isLoginSignup && locationRef === true) {
      changeLocationRef(false);
    }
  }, [props.router.location.pathname, locationRef]);

  if (
    userObj &&
    props?.authorized_user_login?.user?.isLogin !== userObj.isLogin
  ) {
    const response = props.authorized_user_login.user;
    changeUserObj({
      ...response,
    });
  }

  const isUrlChange = useLocation().pathname === "/";
  const changeClassUrlChange = isUrlChange ? null : "url-change";

  return (
    <div className={`main-app ${changeClassUrlChange} p-0 m-0`}>
      <userContext.Provider value={userObj}>
        {props.authorized_user_login.status === "Initiated" ? <Loader /> : null}
        {!locationRef ? <HeaderBar /> : null}
        <RouteSection />
        {!locationRef ? <FooterBar /> : null}
      </userContext.Provider>
    </div>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    authorized_user_login: states.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () =>
      dispatch({
        type: "UPDATE_USER",
      }),
  };
};

export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(App));
