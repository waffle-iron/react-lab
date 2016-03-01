import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../app/appReducer';

// Middlewares you want to use in production:
const enhancer = applyMiddleware(thunk/*, md2, md3*/);

export function configStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState, enhancer);
};

export function getDevTools() {};
