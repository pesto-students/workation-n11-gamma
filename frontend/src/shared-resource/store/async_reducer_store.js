import {initialState} from '';
import {customer_user_reducer} from "../reducers/customer_user_reducer"

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
    CUSTOMER_USER_REDUCER : customer_user_reducer
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