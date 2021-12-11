import {initialState} from '../States/GlobalState';
import {customer_user_reducer} from "../reducers/customer_user_reducer"
import {authorize_user_reducer} from "../reducers/authorize_user_reducer"
import {load_customer_login_reducer} from "../reducers/load_customer_login_reducer"
import {load_customer_logout_reducer} from "../reducers/load_customer_logout_reducer"
import { update_user_reducer } from "../reducers/update_user_reducer"

function createAsyncReducer(initialState, init, success, failure, reset = null) {

    return (state = initialState, action) => {

        switch (action?.status) {

            case 'Initiated' :
                return init(state,action);

            case 'Success' : 
                return success(state,action);

            case 'Failure' :
                return failure(state,action);
            default :
                return state;
        }
    }
}

const reducerMap = Object.freeze({
    CUSTOMER_USER_REDUCER : customer_user_reducer,
    AUTHORIZE_USER_REDUCER : authorize_user_reducer,
    LOGIN_USER_REDUCER : load_customer_login_reducer,
    LOGOUT_USER_REDUCER : load_customer_logout_reducer,
    UPDATE_USER_REDUCER : update_user_reducer
});

const reducer = (initialState, map) => {

    const reducerMapObj = {...map};

    return (state = initialState, action) => {

        const mappedReducer = reducerMapObj[action.type.toString()];

        return mappedReducer ? mappedReducer(state, action) : state;
    }
}

const appReducer = reducer(initialState, reducerMap);

export {appReducer, createAsyncReducer};