import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let _createStore = createStore, createDebugPanel = () => void 0;
if (__DEVTOOLS__) { // Use redux-devtools
  const { devTools, persistState } = require('redux-devtools');
  _createStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    _createStore
  );
  createDebugPanel = (store) => {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    return (
      <DebugPanel top={true} bottom={true} left={true}>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
}

export default {
  createStore: applyMiddleware(thunk)(_createStore),
  createDebugPanel
};