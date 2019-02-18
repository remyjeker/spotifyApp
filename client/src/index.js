import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';

import './index.css';

import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';

const appCookie = new Cookies();
const root = document.getElementById('root');

if (root != null) {
  ReactDOM.render(
    <CookiesProvider>
      <BrowserRouter basename="/app">
        <App cookie={appCookie} />
      </BrowserRouter>
    </CookiesProvider>,
    root
  );

  registerServiceWorker();
}
