import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import type { RouterHistory, Location, Match } from 'react-router-dom';
import type { Cookies } from 'react-cookie';

import type { User } from '../../../types/user';
import ApiService from '../../../services/api';
import AlbumPanel from '../../panel/albums';
import LandingPage from '../../pages/landing';
import SearchPage from '../../pages/search';

import * as PATHS from '../../../routes';

import '../layout.css';

type Props = {
  api: ApiService,
  cookie: Cookies,
  history: RouterHistory,
  location: Location,
  login: () => void,
  logout: () => void,
  match: Match,
  user: User
};

class Content extends Component<Props> {
  constructor(props: any) {
    super(props);

    const { history } = props;

    if (history != null) {
      history.listen((location, action) => {
        // eslint-disable-next-line no-console
        console.log(
          'Router history action : ',
          action,
          'to : ',
          location.pathname
        );
      });
    }
  }

  render() {
    const { api, user, login, logout } = this.props;

    const anonymous: boolean = user == null;

    const handleClick = () => {
      logout();
    };

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

    const GuardTemplate = () => (
      <div className="LoginRedirect">
        <h2>Welcome anonymous!</h2>
        <h4>You must be logged in to search artists!</h4>
        <h4>
          Please, sign in <Link to={PATHS.LANDING_ROUTE}>here</Link>
        </h4>
      </div>
    );

    // eslint-disable-next-line no-shadow
    const PrivateRoute = ({ component: Component, ...routeProps }) => (
      <Route
        {...routeProps}
        render={props =>
          anonymous ? <GuardTemplate /> : <Component {...props} api={api} />
        }
      />
    );

    const ParameterizedLandingPage = () => <LandingPage login={login} />;

    const navClassName = 'AppContent__navigation';
    const navItemsClassName = `${navClassName}__items`;

    const searchLink = (
      <Link to={PATHS.SEARCH_ROUTE}>
        <div className={navItemsClassName}>Search Artists</div>
      </Link>
    );

    const navigationLinks = anonymous ? (
      <div className={navClassName}>
        <Link to={PATHS.LANDING_ROUTE}>
          <div className={navItemsClassName}>Login</div>
        </Link>
        {searchLink}
      </div>
    ) : (
      <div className={navClassName}>
        {searchLink}
        <Link to={PATHS.LANDING_ROUTE} onClick={handleClick}>
          <div className={navItemsClassName}>Logout</div>
        </Link>
      </div>
    );

    return (
      <div className="AppContent remainingHeight">
        <div className="AppContent__wrapper">
          {navigationLinks}
          <Switch>
            <Route path={PATHS.USER_ROUTE} component={UserComponent} />
            <Route path={PATHS.ERROR_ROUTE} component={ErrorComponent} />
            <PrivateRoute path={PATHS.SEARCH_ROUTE} component={SearchPage} />
            <PrivateRoute
              path={PATHS.ARTIST_ALBUMS_ROUTE}
              component={AlbumPanel}
            />
            <Route
              path={PATHS.LANDING_ROUTE}
              component={ParameterizedLandingPage}
            />
            <PrivateRoute path="/*" component={SearchPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Content;
