import '../public/css/style.css';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Router from './routes';

const mountNode = document.getElementById('app-container');

const renderApp = () => {
  render(
    <AppContainer>
      <Router />
    </AppContainer>,
    mountNode
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => renderApp());
}
