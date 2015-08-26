import "./index.less";

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, createDebugPanel } from 'createStore';

import App from './containers/App';
import reducer from './containers/reducers';

const store = createStore(reducer);

React.render(
  <div>
    <Provider store={store}>
      {() => <App />}
    </Provider>
    {createDebugPanel(store)}
  </div>,
  document.getElementById('root')
);
