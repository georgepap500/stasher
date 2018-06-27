import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import AppRouter from './utils/router';
import { setupResponseInterceptors } from './utils/api';
import store from './utils/store';

const browserHistory = createBrowserHistory();
syncHistoryWithStore(browserHistory, store);
setupResponseInterceptors(store);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
