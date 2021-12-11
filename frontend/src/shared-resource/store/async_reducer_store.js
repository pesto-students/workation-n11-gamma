import {initialState} from '../States/GlobalState';
import {reducerMap} from "./reducer_map"

function createAsyncReducer(initialState, init, success, failure, reset = null) {

    return (state = initialState, action) => {

        switch (action?.status) {

            case 'Initiated' :
                return init(state,action);

            case 'Success' : 
                return success(state,action);

            case 'Failure' :
                return failure(state,action);
            default :
                return state;
        }
    }
}

const reducer = (initialState, map) => {

    const reducerMapObj = {...map};

    return (state = initialState, action) => {

        const mappedReducer = reducerMapObj[action.type.toString()];

        return mappedReducer ? mappedReducer(state, action) : state;
    }
}

const appReducer = reducer(initialState, reducerMap);

export {appReducer, createAsyncReducer};