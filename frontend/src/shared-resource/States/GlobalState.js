const initialState = {
  admin: {
    user: {
      status: "NotStarted",
      data: null,
      error: "",
    },
  },

  host: {
    user: {
      status: "NotStarted",
      data: null,
      error: "",
    },
  },

  customer: {
    user: {
      status: "NotStarted",
      data: null,
      error: "",
    },
  },

  user: {
    status: "NotStarted",
    user: {
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
    },
    error: "",
  },
  customerPlaceSearch: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  landingPageData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  citiesPageData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  hotelsPageData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  hostLandingPageData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  hostHotelsPageData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  adminUsersListData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  adminHotelsListData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  adminCitiesListData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  adminBookingsListData: {
    status: "NotStarted",
    data: [],
    error: "",
  },
  customerHotelDetails: {
    status: "NotStarted",
    data: [],
    error: "",
  },
};

export { initialState };
