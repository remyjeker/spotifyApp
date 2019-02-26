import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

import Guard from '../../guard';

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

    const isAuthenticated: boolean = user !== null;

    const ParameterizedLandingPage = () => <LandingPage login={login} />;

    const ParameterizedProfilePage = () => <ProfilePage user={user} />;

    const ParameterizedErrorPage = ({ match }) => <ErrorPage match={match} />;

    const GuardedRoute = routeProps => (
      <Guard {...routeProps} api={api} isAuthorized={isAuthenticated} />
    );

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
            <Route
              path={PATHS.LANDING_ROUTE}
              component={ParameterizedLandingPage}
            />
            <GuardedRoute path={PATHS.SEARCH_ROUTE} component={SearchPage} />
            <GuardedRoute
              path={PATHS.ARTIST_ALBUMS_ROUTE}
              component={AlbumPanel}
            />
            <GuardedRoute component={SearchPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Content;
