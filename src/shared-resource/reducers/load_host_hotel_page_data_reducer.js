// LOAD_HOST_HOTEL_PAGE_DATA_REDUCER

import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  hostHotelsPageData: {
    status: action.status,
    data: state.hostHotelsPageData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  hostHotelsPageData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  hostHotelsPageData: {
    status: action.status,
    data: state.hostHotelsPageData.data,
    error: action.error,
  },
});

const load_host_hotels_page_data_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_host_hotels_page_data_reducer };
