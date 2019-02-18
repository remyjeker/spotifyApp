/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import LandingPage from '../../pages/landing';

import * as PATHS from '../../../routes';

import '../layout.css';

type Props = {
  match: any,
  location: any,
  history: any,
  cookie: any,
  user: any,
  logout: any
};

// eslint-disable-next-line react/no-multi-comp
class Content extends Component<Props> {
  isAuthenticated: boolean = false;

  constructor(props: any) {
    super(props);

    const { history } = props;

    if (history != null) {
      history.listen((location, action) => {
        console.log(action, location.pathname, location.state);
      });
    }
  }

  componentDidUpdate(prevProps: any) {
    console.log('Content - componentDidUpdate', prevProps);
  }

  render() {
    const { user, logout } = this.props;

    const isLoggedIn = user !== null;

    const UserComponent = () => {
      if (user == null) return false;

      return (
        <div className="UserProfile">
          <h5>User : {user.display_name}</h5>
        </div>
      );
    };

    const ErrorComponent = ({ match }) => {
      const { params } = match;
      const { errorMsg } = params;

      return (
        <div className="error">
          <h5>An Error Occured</h5>
          <p>{errorMsg}</p>
        </div>
      );
    };

    const authLink = !isLoggedIn ? (
      <Link to={PATHS.LANDING_ROUTE}>
        <h5>Login</h5>
      </Link>
    ) : (
      <Link to={PATHS.HOME_ROUTE} onClick={logout}>
        <h5>Logout</h5>
      </Link>
    );

    return (
      <div className="AppContent remainingHeight">
        <div className="AppContent__wrapper">
          <Link to={PATHS.HOME_ROUTE}>
            <h5>Home</h5>
          </Link>
          {authLink}
          <hr />
          <Switch>
            <Route path="/user/:id" component={UserComponent} />
            <Route path="/error/:errorMsg" component={ErrorComponent} />
            <Route path={PATHS.HOME_ROUTE} component={() => <h2>Home</h2>} />
            <Route path={PATHS.LANDING_ROUTE} component={LandingPage} />
            <Route component={LandingPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Content;
