import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { persistState } from 'redux-devtools';
import DevTools from './DevTools';

import rootReducer from '../app/appReducer';

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

const enhancer = compose(
  // Middlewares you want to use in development:
  applyMiddleware(thunk/*, md2, md3*/),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
);

export function configStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../app/appReducer', () =>
      store.replaceReducer(require('../app/appReducer')/*.default if you use Babel 6+ */)
    );
  }

  return store;
};

export function getDevTools() {
  return DevTools;
};
