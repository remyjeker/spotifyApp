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

const APP_NAME = 'Spotify Artists Search';
const USER_KEY = 'spotify_app_user';

class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: this.getUser()
    };
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      this.setUser();
    }
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    const { user: currentUser } = this.state;
    if (prevState.user !== null && currentUser == null) {
      return prevState.user;
    }
    return null;
  }

  getUser() {
    const { cookie } = this.props;
    return cookie.get(USER_KEY) || null;
  }

  setUser() {
    this.setState({
      user: this.getUser() || null
    });
  }

  logout = () => {
    const { cookie, history } = this.props;
    cookie.remove(USER_KEY);
    this.setUser();
    history.push('/');
  };

  render() {
    const { user: userState } = this.state;

    return (
      <div className="App isFullScreen">
        <Header title={APP_NAME} />
        <Content {...this.props} user={userState} logout={this.logout} />
      </div>
    );
  }
}

const RoutedApp = withRouter(App);

export default RoutedApp;
