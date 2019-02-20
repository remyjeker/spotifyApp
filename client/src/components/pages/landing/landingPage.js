/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';

import ApiService from '../../../services/api';
import logo from '../../../img/spotify_logo.png';

import './landingPage.css';

type Props = {};

class LandingPage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.apiService = new ApiService();
  }

  // eslint-disable-next-line no-undef
  handleClick = (event: Event) => {
    event.preventDefault();

    this.apiService.login();
  };

  apiService: ApiService;

  render() {
    return (
      <div className="AppPage LandingPage">
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
