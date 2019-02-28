import React, { Component } from 'react';

import type { User } from '../../../types/user';

import spLogo from '../../../img/spotify_logo.png';

import './profilePage.css';

type Props = {
  user: User
};

class ProfilePage extends Component<Props> {
  showOnSpotify = (url: string) => {
    window.open(url);
  };

  handleClick = (spotifyUrl: string) => {
    this.showOnSpotify(spotifyUrl);
  };

  render() {
    const { user: profile } = this.props;

    if (!profile) return <h4>Unable to get user profile</h4>;

    const hasProfileImages = profile.images.length;
    const profileImage = hasProfileImages ? profile.images[0].url : null;

    const totalFollowers = profile.followers.total;

    const { spotify: spotifyUrl } =
      profile.external_urls || 'https://open.spotify.com';

    return (
      <div className="AppPage ProfilePage">
        <h4 className="AppPage__pageTitle">
          {profile.display_name}
          {"'s profile"}
        </h4>
        {profileImage && (
          <img src={profileImage} className="ProfileImage" alt="spotify_logo" />
        )}
        <h5>{totalFollowers} followers</h5>
        <button
          className="SpotifyButton"
          type="button"
          onClick={() => this.handleClick(spotifyUrl)}
        >
          <div className="SpotifyButton__wrapper">
            <div className="SpotifyButton__title">
              <span>Preview on Spotify</span>
            </div>
            <img src={spLogo} className="SpotifyLogo" alt="spotify_logo" />
          </div>
        </button>
      </div>
    );
  }
}

export default ProfilePage;
