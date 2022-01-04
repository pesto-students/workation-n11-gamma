// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios";
import { toast } from "react-toastify";
import * as actiontype from "../Actions/action";
toast.configure();

const notify = async (data) => {
  toast.error(`${data} !`, { theme: "dark" });
};

const isAuthenticated = async () => {
  return await axios("/v1/isAuth", { method: "GET" })
    .then((data) => data)
    .catch((err) => {
      throw new Error({
        statusCode: 401,
        message: err.response.data.message,
      });
    });
};

export const load_login_creds = (storeAPI) => (next) => async (action) => {
  switch (action.type) {
    case actiontype.loadCustomerLogin:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOGIN_USER_REDUCER,
      });
      await axios
        .post("/v1/login", { ...action.payload })
        .then((res) => {
          const output = {
            data: {
              isLogin: true,
              userEmail: res.data.email,
              userName: res.data.username,
              userPassword: "",
              isLogout: false,
              isAdmin: res.data.usertype === "ADMIN",
              isCustomer: res.data.usertype === "CUSTOMER",
              isHost: res.data.usertype === "HOST",
              userId: res.data.id,
              token: res.data.token,
            },
          };

          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOGIN_USER_REDUCER,
            payload: output.data,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOGIN_USER_REDUCER,
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.LOAD_HOST_LOGIN:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOGIN_HOST_REDUCER,
      });
      await axios
        .post("/v1/login", { ...action.payload })
        .then((res) => {
          const output = {
            data: {
              isLogin: true,
              userEmail: res.data.email,
              userName: res.data.username,
              userPassword: "",
              isLogout: false,
              isAdmin: res.data.usertype === "ADMIN",
              isCustomer: res.data.usertype === "CUSTOMER",
              isHost: res.data.usertype === "HOST",
              userId: res.data.id,
              token: res.data.token,
            },
          };
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOGIN_HOST_REDUCER,
            payload: output.data,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOGIN_HOST_REDUCER,
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.LOAD_CUSTOMER_SIGNUP:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_CUSTOMER_SIGNUP_REDUCER,
      });
      await axios
        .post("/v1/signup", { ...action.payload })
        .then((res) => {
          const output = {
            data: {
              isLogin: true,
              userEmail: res.data.email,
              userName: res.data.username,
              userPassword: "",
              isLogout: false,
              isAdmin: res.data.usertype === "ADMIN",
              isCustomer: res.data.usertype === "CUSTOMER",
              isHost: res.data.usertype === "HOST",
              userId: res.data.id,
              token: res.data.token,
            },
          };

          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_CUSTOMER_SIGNUP_REDUCER,
            payload: output.data,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_CUSTOMER_SIGNUP_REDUCER,
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.updateUser:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.UPDATE_USER_REDUCER,
      });
      isAuthenticated()
        .then((data) => {
          if (data && data.data && data.data.message) {
            storeAPI.dispatch({
              status: "Failure",
              type: actiontype.UPDATE_USER_REDUCER,
              error: "Some internal error",
            });
          } else {
            const output = {
              data: {
                isLogin: true,
                userEmail: data.data.email,
                userName: data.data.username,
                userPassword: "",
                isLogout: false,
                isAdmin: data.data.usertype === "ADMIN",
                isCustomer: data.data.usertype === "CUSTOMER",
                isHost: data.data.usertype === "HOST",
                userId: data.data.id,
                token: data.data.token,
              },
            };
            storeAPI.dispatch({
              status: "Success",
              type: actiontype.UPDATE_USER_REDUCER,
              payload: output.data,
            });
          }
        })
        .catch((error) => {
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.UPDATE_USER_REDUCER,
            error: "Some internal error",
          });
        });
      next(action);
      break;

    case actiontype.logoutAuthorize:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOGOUT_USER_REDUCER,
      });
      await axios
        .post("/v1/logout", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOGOUT_USER_REDUCER,
            payload: null,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);

          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOGOUT_USER_REDUCER,
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;

    case actiontype.isLandingSearchAvailable:
      await axios
        .post("/place/isPlaceAvailable", { ...action.payload })
        .then((res) => {
          if (res.data.isAvailable) {
            window.location.href = `/customer/city/${action.payload.name}?dateFrom=${action.payload.date.from}&dateTo=${action.payload.date.to}&budget=${action.payload.budget}`;
          } else {
            notify("Sorry! Place is not available!");
          }
        })
        .catch((err) => {
          notify(err);
        });

      /**
       * Description: Sample for authorization working on both side,
       * Author: Rishabh Verma
       * Warning: Please dont remove the below code
       */
      // await axios.post("/place/register",{...action.payload})
      //                 .then((res)=>{
      //                     console.log(res);
      //                     storeAPI.dispatch({
      //                         status: 'Success',
      //                         payload: res.data,
      //                         type: actiontype.LANDING_SEARCH_BUDGET
      //                     })
      //                 })
      //                 .catch(err=>{
      //                     notify(err.response.data.error)
      //                 })
      next(action);
      break;

    case actiontype.landingSearchOnBudget:
      //success failure is pending
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LANDING_SEARCH_BUDGET,
      });
      await axios
        .post("/place/getSearchPlace", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            payload: res.data,
            type: actiontype.LANDING_SEARCH_BUDGET,
          });
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LANDING_SEARCH_BUDGET,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.SEARCH_ON_FILTER:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.SEARCH_ON_FILTER_REDUCER,
      });

      await axios
        .post("/place/searchonfilter", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.SEARCH_ON_FILTER_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.SEARCH_ON_FILTER_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case actiontype.LOAD_LANDING_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_LANDING_PAGE_DATA_REDUCER,
      });

      await axios
        .post("/place/loadLandingPageData")
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_LANDING_PAGE_DATA_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_LANDING_PAGE_DATA_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;

    case actiontype.LOAD_CITIES_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_CITIES_PAGE_DATA_REDUCER,
      });

      await axios
        .post("/place/loadcitiesPageData", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_CITIES_PAGE_DATA_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_CITIES_PAGE_DATA_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case actiontype.LOAD_HOTELS_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_HOTELS_PAGE_DATA_REDUCER,
      });

      await axios
        .post("/place/loadHotelsPageData", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_HOTELS_PAGE_DATA_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_HOTELS_PAGE_DATA_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case actiontype.LOAD_HOST_LANDING_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_HOST_LANDING_PAGE_DATA_REDUCER,
      });

      await axios
        .post("/place/loadHostLandingPageData", { userId: action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_HOST_LANDING_PAGE_DATA_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_HOST_LANDING_PAGE_DATA_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case actiontype.LOAD_HOST_HOTEL_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_HOST_HOTEL_PAGE_DATA_REDUCER,
      });

      await axios
        .post("/place/loadHostHotelsPageData", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_HOST_HOTEL_PAGE_DATA_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_HOST_HOTEL_PAGE_DATA_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.LOAD_ADMIN_USERS:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_ADMIN_USERS_REDUCER,
      });

      await axios
        .get("/v1/loadAdminUsers")
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_ADMIN_USERS_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_ADMIN_USERS_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.LOAD_ADMIN_HOTELS:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_ADMIN_HOTELS_REDUCER,
      });

      await axios
        .get("/v1/loadAdminHotels")
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_ADMIN_HOTELS_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_ADMIN_HOTELS_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.LOAD_ADMIN_CITIES:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_ADMIN_CITIES_REDUCER,
      });

      await axios
        .get("/v1/loadAdminCities")
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_ADMIN_CITIES_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_ADMIN_CITIES_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.LOAD_ADMIN_BOOKINGS:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.LOAD_ADMIN_BOOKINGS_REDUCER,
      });

      await axios
        .get("/v1/loadAdminBookings")
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.LOAD_ADMIN_BOOKINGS_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.LOAD_ADMIN_BOOKINGS_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.GET_HOTEL_DETAILS_CUSTOMER:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.GET_HOTEL_DETAILS_CUSTOMER_REDUCER,
      });
      await axios
        .post("/place/loadHotelDetails", { hotelId: action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.GET_HOTEL_DETAILS_CUSTOMER_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.GET_HOTEL_DETAILS_CUSTOMER_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case actiontype.BOOKING_SUMMARY_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: actiontype.BOOKING_SUMMARY_DATA_REDUCER,
      });
      await axios
        .post("/place/getbookingsummary", { bookingId: action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: actiontype.BOOKING_SUMMARY_DATA_REDUCER,
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: actiontype.BOOKING_SUMMARY_DATA_REDUCER,
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    default:
      next(action);
  }

  next(action);
};
