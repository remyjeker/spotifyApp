import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import LandingPage from '../../pages/landing';
import SearchPage from '../../pages/search';

import * as PATHS from '../../../routes';

import '../layout.css';

type Props = {
  history: any,
  user: any,
  logout: any
};

class Content extends Component<Props> {
  constructor(props: any) {
    super(props);

    const { history } = props;

    if (history != null) {
      history.listen((location, action) => {
        // eslint-disable-next-line no-console
        console.log('Router history action : ', action, location.pathname);
      });
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log('Content - componentDidUpdate', prevProps, prevState);
  }

  render() {
    const { user, logout } = this.props;

    const anonymous: boolean = user == null;

    const UserComponent = () => {
      if (user == null) return <h5>Unable to get user info</h5>;

      return (
        <div className="UserProfile">
          <h5>User : {user.display_name}</h5>
        </div>
      );
    };

    const ErrorComponent = ({ match }) => {
      const { params } = match;
      const { errorMsg } = params;

      return (
        <div className="error">
          <h5>An Error Occured</h5>
          <p>{errorMsg}</p>
        </div>
      );
    };

    const GuardedSearch = () => {
      if (anonymous) {
        return (
          <div className="LoginRedirect">
            <h2>Welcome anonymous!</h2>
            <h4>You must be logged in to search artists!</h4>
            <h4>
              Please, sign in <Link to={PATHS.LANDING_ROUTE}>here</Link>
            </h4>
          </div>
        );
      }

      return <SearchPage {...this.props} />;
    };

    const navClassName = 'AppContent__navigation';
    const navItemsClassName = `${navClassName}__items`;

    const searchLink = (
      <Link to={PATHS.SEARCH_ROUTE}>
        <div className={navItemsClassName}>Search Artists</div>
      </Link>
    );

    const navigationLinks = anonymous ? (
      <div className={navClassName}>
        <Link to={PATHS.LANDING_ROUTE}>
          <div className={navItemsClassName}>Login</div>
        </Link>
        {searchLink}
      </div>
    ) : (
      <div className={navClassName}>
        {searchLink}
        <Link to={PATHS.LANDING_ROUTE} onClick={logout}>
          <div className={navItemsClassName}>Logout</div>
        </Link>
      </div>
    );

    return (
      <div className="AppContent remainingHeight">
        <div className="AppContent__wrapper">
          {navigationLinks}
          <Switch>
            <Route path={PATHS.USER_ROUTE} component={UserComponent} />
            <Route path={PATHS.ERROR_ROUTE} component={ErrorComponent} />
            <Route path={PATHS.SEARCH_ROUTE} component={GuardedSearch} />
            <Route path={PATHS.LANDING_ROUTE} component={LandingPage} />
            <Route path="/*" component={GuardedSearch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Content;
