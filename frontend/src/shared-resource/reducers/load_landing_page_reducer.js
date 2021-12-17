// LOAD_LANDING_PAGE_DATA_REDUCER
import {initialState} from "../States/GlobalState";
import {createAsyncReducer} from "../store/async_reducer_store";

const init = (state,action) => ({
    ...state,
    landingPageData: {
        status: action.status,
        data: state.landingPageData.data,
        error: ''
    }
})

const success = (state,action) => ({
    ...state,
    landingPageData: {
        status: action.status,
        data: action.payload,
        error: ''
    }
})


const failure = (state,action) => ({
    ...state,
    landingPageData: {
        status: action.status,
        data: state.landingPageData.data,
        error: action.error
    }
})


const load_landing_page_data_reducer = createAsyncReducer(initialState, init, success, failure);

export {load_landing_page_data_reducer}