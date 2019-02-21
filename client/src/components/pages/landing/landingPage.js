import React, { Component } from 'react';

import logo from '../../../img/spotify_logo.png';

import './landingPage.css';

type Props = {
  login: () => void
};

class LandingPage extends Component<Props> {
  render() {
    // eslint-disable-next-line no-undef
    const handleClick = (event: Event) => {
      event.preventDefault();

      const { login } = this.props;

      login();
    };

    return (
      <div className="AppPage LandingPage">
        <button
          className="LandingPage__loginButton"
          type="button"
          onClick={handleClick}
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
