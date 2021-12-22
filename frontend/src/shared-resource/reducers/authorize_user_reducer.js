import { initialState } from "../States/GlobalState";
import { createAsyncReducer } from "../store/async_reducer_store";

const init = (state, action) => ({
  ...state,
  user: {
    status: action.status,
    user: null,
    error: "",
  },
});

const success = (state, action) => ({
  ...state,
  user: {
    status: action.status,
    user: { ...action.payload },
    error: "",
  },
});

const failure = (state, action) => ({
  ...state,
  user: {
    status: action.status,
    user: null,
    error: action.error,
  },
});

const authorize_user_reducer = createAsyncReducer(
  initialState,
  init,
  success,
  failure
);

export { authorize_user_reducer };
