import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  adminUsersListData: {
    status: action.status,
    data: state.adminUsersListData.data,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  adminUsersListData: {
    status: action.status,
    data: action.payload,
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  adminUsersListData: {
    status: action.status,
    data: state.adminUsersListData.data,
    error: action.error,
  },
});

const load_admin_users_list_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { load_admin_users_list_reducer };
