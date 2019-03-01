import React, { Component } from 'react';

import spLogo from '../../../img/spotify_banner.png';
import menuIcon from '../../../img/menu_unclouded.png';
import lightIcon from '../../../img/light_bulb_unclouded.png';

import './header.css';

type Props = {
  changeTheme: () => void,
  title: string
};

const noop = () => {};

class Header extends Component<Props> {
  render() {
    const { title } = this.props;

    const handleToggleMenuClick = () => {
      // eslint-disable-next-line no-console
      console.log('ToggleMenu Click');
    };

    const handleThemeSwitcherClick = () => {
      const { changeTheme } = this.props;

      changeTheme();
    };

    return (
      <div className="AppHeader">
        <div className="AppHeader__logo">
          <img src={spLogo} className="SpotifyLogo" alt="spotify_logo" />
        </div>
        <div
          className="AppHeader__toggleMenu"
          role="link"
          tabIndex={0}
          onKeyPress={noop}
          onClick={handleToggleMenuClick}
        >
          <img
            src={menuIcon}
            className="AppHeader__toggleMenu__icon"
            alt="menu_icon"
          />
        </div>
        <div
          className="AppHeader__themeSwitcher"
          role="link"
          tabIndex={0}
          onKeyPress={noop}
          onClick={handleThemeSwitcherClick}
        >
          <img
            src={lightIcon}
            className="AppHeader__themeSwitcher__icon"
            alt="light_icon"
          />
        </div>
        <div className="AppHeader__title">{title}</div>
      </div>
    );
  }
}

export default Header;
