import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LandingPage from '../../pages/landing';
import * as ROUTES from '../../../routes';

import '../layout.css';

type Props = {};

class Content extends Component<Props> {
  render() {
    // const navigation = (
    //   <ul>
    //     <li>
    //       <Link to={ROUTES.HOME_ROUTE}>Home</Link>
    //     </li>
    //     <li>
    //       <Link to={ROUTES.LANDING_ROUTE}>Landing Page</Link>
    //     </li>
    //   </ul>
    // );

    return (
      <div className="AppContent remainingHeight">
        <Router>
          <div className="AppContent__wrapper">
            {/* {navigation} */}
            {/* <Route
              exact
              path={ROUTES.HOME_ROUTE}
              component={() => <h2>HOME</h2>}
            /> */}
            <Route path={ROUTES.LANDING_ROUTE} component={LandingPage} />
            <Redirect from={ROUTES.HOME_ROUTE} to={ROUTES.LANDING_ROUTE} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Content;
