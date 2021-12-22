import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  customerPlaceSearch: {
    status: action.status,
    data: [],
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  customerPlaceSearch: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  customerPlaceSearch: {
    status: action.status,
    data: state.customerPlaceSearch.data,
    error: action.error,
  },
});

const customer_place_search_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { customer_place_search_reducer };
