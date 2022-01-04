// GET_HOTEL_DETAILS_CUSTOMER_REDUCER

import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  customerHotelDetails: {
    status: action.status,
    data: state.customerHotelDetails.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  customerHotelDetails: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  customerHotelDetails: {
    status: action.status,
    data: state.customerHotelDetails.data,
    error: action.error,
  },
});

const load_customer_hotel_details_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_customer_hotel_details_reducer };
