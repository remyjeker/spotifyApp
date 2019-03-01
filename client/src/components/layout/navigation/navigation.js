import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';

import type { User } from '../../../types/user';
import icon from '../../../img/arrow_back_unclouded.png';
import * as PATHS from '../../../routes';

import './navigation.css';

type Props = {
  history: RouterHistory,
  logout: () => void,
  user: User
};

class Navigation extends Component<Props> {
  constructor(props: Props) {
    super(props);

    const { history } = props;

    if (history != null) {
      history.listen((location, action) => {
        // eslint-disable-next-line no-console
        console.log(
          'Router history action : ',
          action,
          'to : ',
          location.pathname
        );
      });
    }
  }

  render() {
    const { history, logout, user } = this.props;

    const anonymous: boolean = user === null;

    let profilePath = PATHS.PROFILE_ROUTE;

    if (user && !anonymous) {
      const { id } = user;
      profilePath = PATHS.PROFILE_ROUTE.replace(':id', id);
    }

    const handleBackButtonClick = () => {
      history.goBack();
    };

    const handleClick = () => {
      logout();
    };

    const navClassName = 'AppContent__navigation';
    const navItemsClassName = `${navClassName}__items`;

    const backLink = (
      <button
        type="button"
        className="AppContent__linkButton"
        onClick={handleBackButtonClick}
      >
        <div className={navItemsClassName}>
          <img src={icon} alt="back" />
        </div>
      </button>
    );

    const searchLink = (
      <Link to={PATHS.SEARCH_ROUTE}>
        <div className={navItemsClassName}>Search Artists</div>
      </Link>
    );

    const accountLink = (
      <Link to={profilePath}>
        <div className={navItemsClassName}>Profile</div>
      </Link>
    );

    return anonymous ? (
      <div className={navClassName}>
        <Link to={PATHS.LANDING_ROUTE}>
          <div className={navItemsClassName}>Login</div>
        </Link>
        {searchLink}
      </div>
    ) : (
      <div className={navClassName}>
        {backLink}
        {searchLink}
        {accountLink}
        <Link to={PATHS.LANDING_ROUTE} onClick={handleClick}>
          <div className={navItemsClassName}>Logout</div>
        </Link>
      </div>
    );
  }
}

export default Navigation;
