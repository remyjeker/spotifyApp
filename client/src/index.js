import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';

import App from './App';
import ApiService from './services/api';
import registerServiceWorker from './utils/registerServiceWorker';

import * as PATHS from './routes';

import './index.css';

const baseUri = 'http://localhost:5000';
const apiService = new ApiService(baseUri);
const appCookie = new Cookies();
const root = document.getElementById('root');

if (root != null) {
  ReactDOM.render(
    <CookiesProvider>
      <BrowserRouter basename={PATHS.BASE_NAME}>
        <App cookie={appCookie} api={apiService} />
      </BrowserRouter>
    </CookiesProvider>,
    root
  );

  registerServiceWorker();
}
