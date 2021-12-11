import {initialState} from "../States/GlobalState";
import {createAsyncReducer} from "../store/async_reducer_store";


const init = (state,action) => ({
    ...state,
        user: {
            status : action.status,
            user : null,
            error : ''
        }
    
})

const success = (state,action) => ({
    ...state,
        user: {
            status : action.status,
            user : {...action.payload},
            error : ''
        }
    
})


const failure = (state,action) => ({
    ...state,
        user: {
            status : action.status,
            user : state.user.user,
            error : action.error
        }
    
})


const load_customer_login_reducer = createAsyncReducer(initialState, init, success, failure);

export {load_customer_login_reducer}