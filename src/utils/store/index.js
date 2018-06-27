import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './rootReducers';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}

const middleWare = applyMiddleware(...middlewares);

const initialState = {};

function configureStore(init = initialState) {
  let state = init;

  if (typeof state === 'undefined') {
    state = initialState;
  }

  return createStore(reducers, state, middleWare);
}

const store = configureStore();

export default store;
