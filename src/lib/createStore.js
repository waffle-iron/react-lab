import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let _createStore, createDebugPanel = () => void 0;
if (__DEVTOOLS__) { // Use redux-devtools
  const { devTools, persistState } = require('redux-devtools');
  _createStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
  createDebugPanel = (store) => {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    return (
      <DebugPanel top bottom right >
        <DevTools store={store} monitor={LogMonitor} visibleOnLoad />
      </DebugPanel>
    );
  }
}
else {
  _createStore = applyMiddleware(thunk)(createStore);
}

export default {
  createStore: _createStore,
  createDebugPanel
};
