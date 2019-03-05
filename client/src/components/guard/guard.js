import React from 'react';
import { Route, Link } from 'react-router-dom';

import * as PATHS from '../../routes';

import './guard.css';

const GuardTemplate = () => (
  <div className="AppPage GuardPage">
    <div className="GuardPage__wrapper">
      <h2>Welcome anonymous!</h2>
      <h4>You must be logged in to search artists!</h4>
      <h4>
        Please, sign in <Link to={PATHS.LANDING_ROUTE}>here</Link>
      </h4>
    </div>
  </div>
);

const Guard = (props: any) => {
  const { component: Component, ...routeProps } = props;

  return (
    <Route
      {...routeProps}
      render={context =>
        !routeProps.isAuthorized ? (
          <GuardTemplate />
        ) : (
          <Component {...context} api={routeProps.api} />
        )
      }
    />
  );
};

export default Guard;
