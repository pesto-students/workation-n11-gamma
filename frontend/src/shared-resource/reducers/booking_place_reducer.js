import {initialState} from "../States/GlobalState";
import {createAsyncReducer} from "../store/async_reducer_store";

const init = (state,action) => ({
    ...state,
    bookingPlace: {
        status: action.status,
        data: [],
        error: ''
    }
})

const success = (state,action) => ({
    ...state,
    bookingPlace: {
        status: action.status,
        data: action.payload,
        error: ''
    }
})


const failure = (state,action) => ({
    ...state,
    bookingPlace: {
        status: action.status,
        data: state.bookingPlace.data,
        error: action.error
    }
})


const booking_place_reducer = createAsyncReducer(initialState, init, success, failure);

export {booking_place_reducer}