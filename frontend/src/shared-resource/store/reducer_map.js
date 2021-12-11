
import {customer_user_reducer} from "../reducers/customer_user_reducer"
import {authorize_user_reducer} from "../reducers/authorize_user_reducer"
import {load_customer_login_reducer} from "../reducers/load_customer_login_reducer"
import {load_customer_logout_reducer} from "../reducers/load_customer_logout_reducer"
import { update_user_reducer } from "../reducers/update_user_reducer"
import {customer_place_search_reducer} from "../reducers/customer_place_search_reducer"


const reducerMap = Object.freeze({
    CUSTOMER_USER_REDUCER : customer_user_reducer,
    AUTHORIZE_USER_REDUCER : authorize_user_reducer,
    LOGIN_USER_REDUCER : load_customer_login_reducer,
    LOGOUT_USER_REDUCER : load_customer_logout_reducer,
    UPDATE_USER_REDUCER : update_user_reducer,
    LANDING_SEARCH_BUDGET: customer_place_search_reducer
});


export {reducerMap}