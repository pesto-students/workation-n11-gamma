import {initialState} from "../States/GlobalState";
import {createAsyncReducer} from "../store/async_reducer_store";


const init = (state,action) => ({
    ...state,
        user: {
            status : action.status,
            user : state.user.user,
            error : ''
        }
    
})

const success = (state,action) => ({
    ...state,
        user: {
            status : action.status,
            user : {
                isLogin: false,
                userEmail: '',
                userName: '',
                userPassword: '',
                isLogout: true,
                isAdmin : false,
                isCustomer: false,
                isHost: false,
                userId: '',
                token: ''
               },
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


const load_customer_logout_reducer = createAsyncReducer(initialState, init, success, failure);

export {load_customer_logout_reducer}