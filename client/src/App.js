import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory, Location, Match } from 'react-router-dom';
import type { Cookies } from 'react-cookie';

import type { User } from './types/user';
import ApiService from './services/api';
import Header from './components/layout/header';
import Content from './components/layout/content';

import * as PATHS from './routes';

import './main.css';

type Props = {
  history: RouterHistory,
  location: Location,
  match: Match,
  api: ApiService,
  cookie: Cookies
};

type State = {
  user: User | null
};

// From .env file
const APP_NAME = 'Spotify Artists Search';
const USER_COOKIE_KEY = 'spotify_app_user';
const ACCESS_TOKEN_COOKIE_KEY = 'spotify_app_access_token';
const REFRESH_TOKEN_COOKIE_KEY = 'spotify_app_refresh_token';

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: this.getUser() || null
    };

    console.log('App - props', props);
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      this.setUser(null);
    }
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    const { user: currentUser } = this.state;

    if (prevState.user !== null && currentUser == null) {
      return prevState.user;
    }
    return null;
  }

  getUser(): User {
    const { cookie } = this.props;

    return cookie.get(USER_COOKIE_KEY);
  }

  setUser = (value: User) => {
    this.setState({
      user: value || null
    });
  };

  login = () => {
    const { api } = this.props;

    api.login();
  };

  logout = () => {
    const { cookie, history } = this.props;

    cookie.remove(USER_COOKIE_KEY);
    cookie.remove(ACCESS_TOKEN_COOKIE_KEY);
    cookie.remove(REFRESH_TOKEN_COOKIE_KEY);

    this.setUser(null);

    history.push(PATHS.LANDING_ROUTE);
  };

  render() {
    const { user: userState } = this.state;

    return (
      <div className="App isFullScreen">
        <Header title={APP_NAME} />
        <Content
          {...this.props}
          user={userState}
          login={this.login}
          logout={this.logout}
        />
      </div>
    );
  }
}

const RoutedApp = withRouter(App);

export default RoutedApp;
