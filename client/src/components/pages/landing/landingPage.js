/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';

import AuthService from '../../../services/auth';
import logo from '../../../img/spotify_logo.png';

import './landingPage.css';

type Props = {};

class LandingPage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.authService = new AuthService();
  }

  // eslint-disable-next-line no-undef
  handleClick = (event: Event) => {
    event.preventDefault();

    this.authService.login();
  };

  authService: AuthService;

  render() {
    return (
      <div className="LandingPage">
        <button
          className="LandingPage__loginButton"
          type="button"
          onClick={this.handleClick}
        >
          <div className="LandingPage__loginButton__wrapper">
            <div className="LandingPage__loginButton__title">
              <span>Login with Spotify</span>
            </div>
            <img src={logo} className="Logo" alt="spotify_logo" />
          </div>
        </button>
      </div>
    );
  }
}

export default LandingPage;
