import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import type { RouterHistory, Location, Match } from 'react-router-dom';
import type { Cookies } from 'react-cookie';

import type { User } from '../../../types/user';
import ApiService from '../../../services/api';
import AlbumPanel from '../../panel/albums';
import LandingPage from '../../pages/landing';
import ProfilePage from '../../pages/profile';
import SearchPage from '../../pages/search';
import ErrorPage from '../../pages/error';
import Navigation from '../navigation';

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
  render() {
    const { api, user, login, logout, history } = this.props;

    const anonymous: boolean = user == null;

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
    const ParameterizedProfilePage = () => <ProfilePage user={user} />;
    const ParameterizedErrorPage = ({ match }) => <ErrorPage match={match} />;

    return (
      <div className="AppContent remainingHeight">
        <div className="AppContent__wrapper">
          <Navigation history={history} logout={logout} user={user} />
          <Switch>
            <Route
              path={PATHS.PROFILE_ROUTE}
              component={ParameterizedProfilePage}
            />
            <Route
              path={PATHS.ERROR_ROUTE}
              component={ParameterizedErrorPage}
            />
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
