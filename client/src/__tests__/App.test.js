import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';

import App from '../App';

const testAppCookie = new Cookies();

// eslint-disable-next-line no-undef
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CookiesProvider>
      <BrowserRouter>
        <App cookie={testAppCookie} />
      </BrowserRouter>
    </CookiesProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
