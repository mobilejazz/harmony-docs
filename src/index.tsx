// React
import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter, Route } from 'react-router-dom';

// Components
import App from './containers/App/App';

// Global styles
import './assets/styles/global.scss';

const app = (
  <BrowserRouter>
    <Route path="/" component={App}></Route>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
