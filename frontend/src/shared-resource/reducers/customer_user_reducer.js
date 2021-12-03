import {initialState} from "../States/GlobalState";
import {createAsyncReducer} from "../store/async_reducer_store";


const init = (state,action) => ({
    ...state,
    customer : {
        user: {
            status : action.status,
            data : null,
            error : ''
        }
    }
})

const success = (state,action) => ({
    ...state,
    customer : {
        user: {
            status : action.status,
            data : action.payload,
            error : ''
        }
    }
})


const failure = (state,action) => ({
    ...state,
    customer : {
        user: {
            status : action.status,
            data : null,
            error : action.error
        }
    }
})


const customer_user_reducer = createAsyncReducer(initialState, init, success, failure);

export {customer_user_reducer}