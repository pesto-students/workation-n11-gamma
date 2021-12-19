import React from "react";

const defaultUser = {
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

const userContext = React.createContext(defaultUser);

export { userContext };
