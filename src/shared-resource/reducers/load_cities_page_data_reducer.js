// LOAD_LANDING_PAGE_DATA_REDUCER
import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  citiesPageData: {
    status: action.status,
    data: state.citiesPageData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  citiesPageData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  citiesPageData: {
    status: action.status,
    data: {
      ...state.citiesPageData.data,
      to: state.citiesPageData.data.to - 10,
      from: state.citiesPageData.data.from - 10,
    },
    error: action.error,
  },
});

const load_cities_page_data_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_cities_page_data_reducer };
