import React from 'react';
import ReactDOM from 'react-dom';

import router from './router';
import './styles/main.scss';

const test = 'test';

ReactDOM.render(
  <div id="app">
    {router}
  </div>,
  document.getElementById('root')
);
