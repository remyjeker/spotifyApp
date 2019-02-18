import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';

import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';

import * as PATHS from './routes';

import './index.css';

const appCookie = new Cookies();
const root = document.getElementById('root');

if (root != null) {
  ReactDOM.render(
    <CookiesProvider>
      <BrowserRouter basename={PATHS.BASE_NAME}>
        <App cookie={appCookie} />
      </BrowserRouter>
    </CookiesProvider>,
    root
  );

  registerServiceWorker();
}
