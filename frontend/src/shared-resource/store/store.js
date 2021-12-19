import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { appReducer } from "./async_reducer_store";
import { AllMiddleware } from "./Middlewares";

const reducers = combineReducers({
  app: appReducer,
});

const dev_extension = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__";

const middleware = [...AllMiddleware, ReduxThunk];

const composeEnhancers = window[dev_extension] || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export { store };
