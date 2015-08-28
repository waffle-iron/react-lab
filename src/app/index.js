import './theme';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, createDebugPanel } from 'createStore';

import App from './containers/app';
import storeStateReducer from './containers/appReducer';

const store = createStore(storeStateReducer);

React.render(
  <div>
    <Provider store={store}>
      {() => <App renderOnly />}
    </Provider>
    {createDebugPanel(store)}
  </div>,
  document.getElementById('root')
);
