import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore.dev';
import routes from './routes';
import { persistStore } from 'redux-persist';

const store = configureStore();
persistStore(store);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
