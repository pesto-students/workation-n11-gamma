// LOAD_LANDING_PAGE_DATA_REDUCER
import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  hostLandingPageData: {
    status: action.status,
    data: state.hostLandingPageData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  hostLandingPageData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  hostLandingPageData: {
    status: action.status,
    data: state.hostLandingPageData.data,
    error: action.error,
  },
});

const load_host_landing_page_data_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_host_landing_page_data_reducer };
