import { customer_user_reducer } from "../reducers/customer_user_reducer";
import { authorize_user_reducer } from "../reducers/authorize_user_reducer";
import { load_customer_login_reducer } from "../reducers/load_customer_login_reducer";
import { load_customer_logout_reducer } from "../reducers/load_customer_logout_reducer";
import { update_user_reducer } from "../reducers/update_user_reducer";
import { customer_place_search_reducer } from "../reducers/customer_place_search_reducer";
import { search_on_filter_reducer } from "../reducers/search_on_filter_reducer";
import { signup_customer_reducer } from "../reducers/signup_customer_reducer";
import { load_landing_page_data_reducer } from "../reducers/load_landing_page_reducer";
import { load_host_login_reducer } from "../reducers/load_host_login_reducer";
import { load_cities_page_data_reducer } from "../reducers/load_cities_page_data_reducer";
import { load_hotels_page_data_reducer } from "../reducers/load_hotels_page_data_reducer";
import { load_host_landing_page_data_reducer } from "../reducers/load_host_landing_page_data_reducer";
import { load_host_hotels_page_data_reducer } from "../reducers/load_host_hotel_page_data_reducer";
import { load_admin_users_list_reducer } from "../reducers/admin_users_list_reducer";
import { load_admin_hotels_list_reducer } from "../reducers/admin_hotels_list_reducer";
import { load_admin_cities_list_reducer } from "../reducers/admin_cities_list_reducer";
import { load_admin_booking_list_reducer } from "../reducers/admin_booking_list_reducer";

const reducerMap = Object.freeze({
  CUSTOMER_USER_REDUCER: customer_user_reducer,
  AUTHORIZE_USER_REDUCER: authorize_user_reducer,
  LOGIN_USER_REDUCER: load_customer_login_reducer,
  LOGOUT_USER_REDUCER: load_customer_logout_reducer,
  UPDATE_USER_REDUCER: update_user_reducer,
  LANDING_SEARCH_BUDGET: customer_place_search_reducer,
  SEARCH_ON_FILTER_REDUCER: search_on_filter_reducer,
  LOAD_CUSTOMER_SIGNUP_REDUCER: signup_customer_reducer,
  LOAD_LANDING_PAGE_DATA_REDUCER: load_landing_page_data_reducer,
  LOGIN_HOST_REDUCER: load_host_login_reducer,
  LOAD_CITIES_PAGE_DATA_REDUCER: load_cities_page_data_reducer,
  LOAD_HOTELS_PAGE_DATA_REDUCER: load_hotels_page_data_reducer,
  LOAD_HOST_LANDING_PAGE_DATA_REDUCER: load_host_landing_page_data_reducer,
  LOAD_HOST_HOTEL_PAGE_DATA_REDUCER: load_host_hotels_page_data_reducer,
  LOAD_ADMIN_USERS_REDUCER: load_admin_users_list_reducer,
  LOAD_ADMIN_HOTELS_REDUCER: load_admin_hotels_list_reducer,
  LOAD_ADMIN_CITIES_REDUCER: load_admin_cities_list_reducer,
  LOAD_ADMIN_BOOKINGS_REDUCER: load_admin_booking_list_reducer,
});

export { reducerMap };
