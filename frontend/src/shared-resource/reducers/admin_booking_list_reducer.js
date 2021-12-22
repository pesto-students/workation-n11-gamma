// adminBookingsListData;
// we can make the hogher order function for these too!
import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  adminBookingsListData: {
    status: action.status,
    data: state.adminBookingsListData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  adminBookingsListData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  adminBookingsListData: {
    status: action.status,
    data: state.adminBookingsListData.data,
    error: action.error,
  },
});

const load_admin_booking_list_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_admin_booking_list_reducer };
