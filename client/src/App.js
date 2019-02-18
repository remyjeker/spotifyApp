/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from './components/layout/header';
import Content from './components/layout/content';

import './main.css';

type Props = {
  match: any,
  location: any,
  history: any,
  cookie: any
};

type State = {
  user: any
};

const USER_KEY = 'spotify_app_user';

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: this.getUser()
    };
  }

  componentDidUpdate(prevProps: any) {
    console.log('App - componentDidUpdate', prevProps);
  }

  getUser() {
    const { cookie } = this.props;
    return cookie.get(USER_KEY) || null;
  }

  setUser() {
    this.setState({
      user: this.getUser()
    });
  }

  logout = () => {
    const { cookie } = this.props;
    cookie.remove(USER_KEY);
    this.setUser();
  };

  render() {
    const appName: string = 'Spotify Artists Search';
    const { user } = this.state;

    return (
      <div className="App isFullScreen">
        <Header title={appName} />
        <Content {...this.props} user={user} logout={this.logout} />
      </div>
    );
  }
}

const RoutedApp = withRouter(App);

export default RoutedApp;
