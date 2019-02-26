import React from 'react';
import { Route, Link } from 'react-router-dom';

import * as PATHS from '../../routes';

const GuardTemplate = () => (
  <div className="LoginRedirect">
    <h2>Welcome anonymous!</h2>
    <h4>You must be logged in to search artists!</h4>
    <h4>
      Please, sign in <Link to={PATHS.LANDING_ROUTE}>here</Link>
    </h4>
  </div>
);

const Guard = ({ component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props =>
      !routeProps.isAuthorized ? (
        <GuardTemplate />
      ) : (
        <Component {...props} api={routeProps.api} />
      )
    }
  />
);

export default Guard;
