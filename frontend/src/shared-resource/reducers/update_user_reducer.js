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
            user : action.payload,
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


const update_user_reducer = createAsyncReducer(initialState, init, success, failure);

export {update_user_reducer}