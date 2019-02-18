import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import LandingPage from '../../pages/landing';

import * as PATHS from '../../../routes';

import '../layout.css';

type Props = {
  history: any,
  user: any,
  logout: any
};

class Content extends Component<Props> {
  constructor(props: any) {
    super(props);

    const { history } = props;

    if (history != null) {
      history.listen((location, action) => {
        console.log('Router history action : ', action, location.pathname);
      });
    }
  }

  render() {
    const { user, logout } = this.props;
    const anonymous = user == null;

    const UserComponent = () => {
      if (user == null) return <h5>Unable to get user info</h5>;

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

    const authLink = anonymous ? (
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
            <Route path={PATHS.USER_ROUTE} component={UserComponent} />
            <Route path={PATHS.ERROR_ROUTE} component={ErrorComponent} />
            <Route
              path={PATHS.HOME_ROUTE}
              component={() => <h2>Welcome!</h2>}
            />
            <Route path={PATHS.LANDING_ROUTE} component={LandingPage} />
            <Route path="/*" component={LandingPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Content;
