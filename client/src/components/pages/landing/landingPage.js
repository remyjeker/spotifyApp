import React, { Component } from 'react';

import spLogo from '../../../img/spotify_logo.png';

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
        <button className="SpotifyButton" type="button" onClick={handleClick}>
          <div className="SpotifyButton__wrapper">
            <div className="SpotifyButton__title">
              <span>Login with Spotify</span>
            </div>
            <img src={spLogo} className="SpotifyLogo" alt="spotify_logo" />
          </div>
        </button>
      </div>
    );
  }
}

export default LandingPage;
