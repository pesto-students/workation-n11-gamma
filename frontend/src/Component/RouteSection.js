import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import { NotFound } from "./NotFound";
import CustomerLogin from "../Customer/Pages/Login";
import CustomerSignUp from "../Customer/Pages/SignUp";
import AdminLogin from "../Admin/Pages/Login";
import AdminLanding from "../Admin/Pages/AdminLandingPage";
import { withRouter } from "../shared-resource/store/withRouter";
import HotelAvailable from "../Customer/Pages/HotelAvailable";
import Cities from "./Cities";
import Hotels from "./Hotels";
import history from "../shared-resource/store/history";
import FindCity from "../Customer/Pages/Find_city";
import Aboutus from "./Aboutus";
import Contactus from "./Contactus";
import { userContext } from "../shared-resource/Contexts/User_Context";
import HostLandingPage from "../Host/Pages/Host_Landing_Page";
import HostHotelPage from "../Host/Pages/Host_Hotel_Page";
import { connect } from "react-redux";

function RouteSection(props) {
  const usersAuth = useContext(userContext);

  return (
    <div>
      <Routes history={history}>
        {usersAuth.isHost ? (
          // eslint-disable-next-line react/jsx-pascal-case
          <Route path="/" element={<HostLandingPage />} exact />
        ) : usersAuth.isAdmin ? (
          <Route path="/" element={<AdminLanding />} exact />
        ) : (
          <Route path="/" element={<LandingPage />} exact />
        )}
        <Route path="/about-us" element={<Aboutus />} exact />
        <Route path="/contact-us" element={<Contactus />} exact />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/signup" element={<CustomerSignUp />} />
        <Route path="/host/hotel/:hotelId" element={<HostHotelPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/customer/city/:cityName" element={<FindCity />} exact />
        <Route path="/customer/findcities" element={<Cities />} />
        <Route path="/customer/findHotels" element={<Hotels />} />
        <Route path="/customer/hotel/:id" element={<HotelAvailable />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    authorized_user_login: states.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(RouteSection)
);
