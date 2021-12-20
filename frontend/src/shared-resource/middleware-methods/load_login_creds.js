// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios";
import { toast } from "react-toastify";
import * as ACTIONS from "../Actions/action";
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
    case ACTIONS.loadCustomerLogin:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOGIN_USER_REDUCER",
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
            type: "LOGIN_USER_REDUCER",
            payload: output.data,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOGIN_USER_REDUCER",
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;
    case ACTIONS.LOAD_HOST_LOGIN:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOGIN_HOST_REDUCER",
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
            type: "LOGIN_HOST_REDUCER",
            payload: output.data,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOGIN_HOST_REDUCER",
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;
    case ACTIONS.LOAD_CUSTOMER_SIGNUP:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOAD_CUSTOMER_SIGNUP_REDUCER",
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
            type: "LOAD_CUSTOMER_SIGNUP_REDUCER",
            payload: output.data,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOAD_CUSTOMER_SIGNUP_REDUCER",
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;
    case ACTIONS.updateUser:
      storeAPI.dispatch({
        status: "Initiated",
        type: "UPDATE_USER_REDUCER",
      });
      isAuthenticated()
        .then((data) => {
          if (data && data.data && data.data.message) {
            storeAPI.dispatch({
              status: "Failure",
              type: "UPDATE_USER_REDUCER",
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
              type: "UPDATE_USER_REDUCER",
              payload: output.data,
            });
          }
        })
        .catch((error) => {
          storeAPI.dispatch({
            status: "Failure",
            type: "UPDATE_USER_REDUCER",
            error: "Some internal error",
          });
        });
      next(action);
      break;

    case ACTIONS.logoutAuthorize:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOGOUT_USER_REDUCER",
      });
      await axios
        .post("/v1/logout", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: "LOGOUT_USER_REDUCER",
            payload: null,
          });

          window.location.href = "/";
        })
        .catch((err) => {
          notify(err.response.data.error);

          storeAPI.dispatch({
            status: "Failure",
            type: "LOGOUT_USER_REDUCER",
            error: (err && err.response.data.error) || "Some internal error",
          });
        });
      next(action);
      break;

    case ACTIONS.isLandingSearchAvailable:
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
      //                         type: 'LANDING_SEARCH_BUDGET'
      //                     })
      //                 })
      //                 .catch(err=>{
      //                     notify(err.response.data.error)
      //                 })
      next(action);
      break;

    case ACTIONS.landingSearchOnBudget:
      //success failure is pending
      storeAPI.dispatch({
        status: "Initiated",
        type: "LANDING_SEARCH_BUDGET",
      });
      await axios
        .post("/place/getSearchPlace", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            payload: res.data,
            type: "LANDING_SEARCH_BUDGET",
          });
        })
        .catch((err) => {
          notify(err.response.data.error);
          storeAPI.dispatch({
            status: "Failure",
            type: "LANDING_SEARCH_BUDGET",
            error: err?.response?.data?.message || "Some internal error",
          });
        });
      next(action);
      break;
    case "SEARCH_ON_FILTER":
      storeAPI.dispatch({
        status: "Initiated",
        type: "SEARCH_ON_FILTER_REDUCER",
      });

      await axios
        .post("/place/searchonfilter", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: "SEARCH_ON_FILTER_REDUCER",
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: "SEARCH_ON_FILTER_REDUCER",
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case ACTIONS.LOAD_LANDING_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOAD_LANDING_PAGE_DATA_REDUCER",
      });

      await axios
        .post("/place/loadLandingPageData")
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: "LOAD_LANDING_PAGE_DATA_REDUCER",
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOAD_LANDING_PAGE_DATA_REDUCER",
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;

    case ACTIONS.LOAD_CITIES_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOAD_CITIES_PAGE_DATA_REDUCER",
      });

      await axios
        .post("/place/loadcitiesPageData", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: "LOAD_CITIES_PAGE_DATA_REDUCER",
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOAD_CITIES_PAGE_DATA_REDUCER",
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case ACTIONS.LOAD_HOTELS_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOAD_HOTELS_PAGE_DATA_REDUCER",
      });

      await axios
        .post("/place/loadHotelsPageData", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: "LOAD_HOTELS_PAGE_DATA_REDUCER",
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOAD_HOTELS_PAGE_DATA_REDUCER",
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case ACTIONS.LOAD_HOST_LANDING_PAGE_DATA:
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOAD_HOST_LANDING_PAGE_DATA_REDUCER",
      });

      await axios
        .post("/place/loadHostLandingPageData", { userId: action.payload })
        .then((res) => {
          console.log(res);
          storeAPI.dispatch({
            status: "Success",
            type: "LOAD_HOST_LANDING_PAGE_DATA_REDUCER",
            payload: res.data,
          });
        })
        .catch((err) => {
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOAD_HOST_LANDING_PAGE_DATA_REDUCER",
            error: err?.response?.data?.message || "Some internal error",
          });
        });

      next(action);
      break;
    case ACTIONS.LOAD_HOST_HOTEL_PAGE_DATA:
      //  console.log(action.payload);
      storeAPI.dispatch({
        status: "Initiated",
        type: "LOAD_HOST_HOTEL_PAGE_DATA_REDUCER",
      });

      await axios
        .post("/place/loadHostHotelsPageData", { ...action.payload })
        .then((res) => {
          storeAPI.dispatch({
            status: "Success",
            type: "LOAD_HOST_HOTEL_PAGE_DATA_REDUCER",
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          notify(err?.response?.data?.message);
          storeAPI.dispatch({
            status: "Failure",
            type: "LOAD_HOST_HOTEL_PAGE_DATA_REDUCER",
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
