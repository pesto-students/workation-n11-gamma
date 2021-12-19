// LOAD_LANDING_PAGE_DATA_REDUCER
import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  hotelsPageData: {
    status: action.status,
    data: state.hotelsPageData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  hotelsPageData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  hotelsPageData: {
    status: action.status,
    data: {
      ...state.hotelsPageData.data,
      to: state.hotelsPageData.data.to - 10,
      from: state.hotelsPageData.data.from - 10,
    },
    error: action.error,
  },
});

const load_hotels_page_data_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_hotels_page_data_reducer };
