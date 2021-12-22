// BOOKING_SUMMARY_DATA_REDUCER
import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  bookingSummary: {
    status: action.status,
    data: state.bookingSummary.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  bookingSummary: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  bookingSummary: {
    status: action.status,
    data: {
      ...state.bookingSummary.data,
      to: state.bookingSummary.data.to - 10,
      from: state.bookingSummary.data.from - 10,
    },
    error: action.error,
  },
});

const booking_summary_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { booking_summary_reducer };
