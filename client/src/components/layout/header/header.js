import React, { Component } from 'react';

import logo from '../../../img/spotify_banner.png';

import '../layout.css';

type Props = {
  title: string
};

class Header extends Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <div className="AppHeader">
        <div className="AppHeader__wrapper">
          <img src={logo} className="Logo" alt="spotify_logo" />
        </div>
        <div className="AppHeader__title">{title}</div>
      </div>
    );
  }
}

export default Header;
