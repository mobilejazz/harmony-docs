// React
import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './containers/App/App';

// Global styles
import './assets/styles/global.scss';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
