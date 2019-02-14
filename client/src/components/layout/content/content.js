import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../../pages/landing';
import * as ROUTES from '../../../routes';

import '../layout.css';

type Props = {};

class Content extends Component<Props> {
  render() {
    return (
      <div className="AppContent remainingHeight">
        <Router>
          <div className="AppContent__wrapper">
            <Route exact path={ROUTES.BASE_ROUTE} component={LandingPage} />

            <Route exact path={ROUTES.LANDING_ROUTE} component={LandingPage} />

            <Route path={ROUTES.HOME_ROUTE} component={() => <h2>HOME</h2>} />

            <Route path="*" component={() => <h2>404</h2>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Content;
