import './theme';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, createDebugPanel } from 'createStore';

import App from './app/app';
import storeStateReducer from './app/appReducer';

const store = createStore(storeStateReducer);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App renderOnly />
    </Provider>
    {createDebugPanel(store)}
  </div>,
  document.getElementById('root')
);
