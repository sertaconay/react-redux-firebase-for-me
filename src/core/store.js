/* eslint-disable no-underscore-dangle */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInVariant from 'redux-immutable-state-invariant';
import rootReducer from 'reducers';
import { createLogger } from 'redux-logger';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, reduxImmutableStateInVariant(), createLogger()];

const storeProd = (initialState =>
  createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
);

const storeDev = (initialState =>
    createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
);

const store = process.env.NODE_ENV === 'production' ? storeProd : storeDev;

export default store;
