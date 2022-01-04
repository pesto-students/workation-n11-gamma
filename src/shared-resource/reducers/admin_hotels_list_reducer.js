import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  adminHotelsListData: {
    status: action.status,
    data: state.adminHotelsListData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  adminHotelsListData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  adminHotelsListData: {
    status: action.status,
    data: state.adminHotelsListData.data,
    error: action.error,
  },
});

const load_admin_hotels_list_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_admin_hotels_list_reducer };
