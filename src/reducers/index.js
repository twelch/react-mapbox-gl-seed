import { combineReducers } from 'redux';
import counter from './counter';
import map from './map';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  counter,
  map,
  router: routerStateReducer
});
