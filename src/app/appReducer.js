import { combineReducers } from 'redux';
import { asyncStateReducer } from 'async';
import { LOAD_END } from './appActions';
import bomReducer from '../bom/bomReducer';

function navReducer(state = [], action) {
  switch (action.type) {
  case LOAD_END:
    return action.result.nav;
  default:
    return state;
  }
}

const storeStateReducer = combineReducers({
  'req': asyncStateReducer,
  'nav': navReducer,
  'bom': bomReducer
});

export default storeStateReducer;
