import './theme';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/app';

import { configStore, getDevTools } from './lib/createStore';
const store = configStore();
const DevTools = getDevTools();
render(
  <Provider store={store}>
    <div>
      <App renderOnly />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
