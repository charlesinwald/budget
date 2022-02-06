import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from "redux-devtools-extension";

import user from './user';
import todos from './todos';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  user,
  todos,
  composeWithDevTools,
});

export default createRootReducer;
