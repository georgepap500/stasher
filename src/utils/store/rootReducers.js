import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const combinedReducer = combineReducers({
  routing
});

function rootReducers(state, action) {
  switch (action.type) {
    default:
      return combinedReducer(state, action);
  }
}

export default rootReducers;
