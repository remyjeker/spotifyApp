import React, { Component } from 'react';

import logo from '../../../spotify_logo.png';

import '../layout.css';

type Props = {
  title: string
};

class Header extends Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <div className="Header">
        <div className="Header__wrapper">
          <img src={logo} className="HeaderWrapper__logo" alt="spotify_logo" />
        </div>
        <div className="Header__title">{title}</div>
      </div>
    );
  }
}

export default Header;
