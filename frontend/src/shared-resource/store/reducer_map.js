
import {customer_user_reducer} from "../reducers/customer_user_reducer"
import {authorize_user_reducer} from "../reducers/authorize_user_reducer"
import {load_customer_login_reducer} from "../reducers/load_customer_login_reducer"
import {load_customer_logout_reducer} from "../reducers/load_customer_logout_reducer"
import { update_user_reducer } from "../reducers/update_user_reducer"
import {customer_place_search_reducer} from "../reducers/customer_place_search_reducer"

import { search_on_filter_reducer } from "../reducers/search_on_filter_reducer"
import {signup_customer_reducer} from '../reducers/signup_customer_reducer'
import {booking_place_reducer} from "../reducers/booking_place_reducer"

const reducerMap = Object.freeze({
    CUSTOMER_USER_REDUCER : customer_user_reducer,
    AUTHORIZE_USER_REDUCER : authorize_user_reducer,
    LOGIN_USER_REDUCER : load_customer_login_reducer,
    LOGOUT_USER_REDUCER : load_customer_logout_reducer,
    UPDATE_USER_REDUCER : update_user_reducer,
    LANDING_SEARCH_BUDGET: customer_place_search_reducer,

    SEARCH_ON_FILTER_REDUCER: search_on_filter_reducer,
    LOAD_CUSTOMER_SIGNUP_REDUCER: signup_customer_reducer,
    BOOK_PLACE_REDUCER: booking_place_reducer
});


export {reducerMap}