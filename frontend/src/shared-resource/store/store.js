import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
// import { appReducer } from "./async_reducer_store"
// combine all reducers
const reducers = combineReducers({
        // app : appReducer 
});

const dev_extension = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

const middleware = [ReduxThunk];

const composeEnhancers = window[dev_extension] || compose;

// creating store with middlewares
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));


export {store};