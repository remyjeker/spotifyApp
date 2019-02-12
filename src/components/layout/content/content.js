import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LandingPage from '../../pages/landing';
import * as ROUTES from '../../../routes';

import '../layout.css';

type Props = {};

class App extends Component<Props> {
  render() {
    const navigation = (
      <ul>
        <li>
          <Link to={ROUTES.HOME_ROUTE}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING_ROUTE}>Landing Page</Link>
        </li>
      </ul>
    );

    return (
      <div className="AppContent">
        <Router>
          <div>
            {navigation}
            <Route
              exact
              path={ROUTES.HOME_ROUTE}
              component={() => <h2>HOME</h2>}
            />
            <Route path={ROUTES.LANDING_ROUTE} component={LandingPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
