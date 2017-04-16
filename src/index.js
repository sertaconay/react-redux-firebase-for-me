import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'core/store';
import routes from 'core/routes';
import 'core/style';


const store = configureStore();

render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('app'),
);
