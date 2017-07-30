import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

// Layout
import { AppLayout } from './layouts';

// Public pages
import { Home } from './pages';

export default(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path='/' component={ AppLayout }>
        <IndexRoute component={ Home } />
        <Route path='*' component={ Home } />
      </Route>
    </Router>
  </Provider>
);
