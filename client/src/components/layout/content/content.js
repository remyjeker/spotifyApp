import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../../pages/landing';

import '../layout.css';

type Props = {};

export class ErrorCmp extends Component<{
  match: {
    params: any
  }
}> {
  render() {
    const { match } = this.props;
    const { params } = match;
    const { errorMsg } = params;

    return (
      <div className="error">
        <h2>An Error Occured</h2>
        <p>{errorMsg}</p>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export class UserCmp extends Component<{
  match: {
    params: any
  }
}> {
  render() {
    const { match } = this.props;
    const { params } = match;
    const { accessToken, refreshToken } = params;

    return (
      <div className="user">
        <h2>User</h2>
        <p>{accessToken}</p>
        <p>{refreshToken}</p>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class Content extends Component<Props> {
  render() {
    return (
      <div className="AppContent remainingHeight">
        <Router>
          <div className="AppContent__wrapper">
            <Route exact path="/" component={() => <h2>Home</h2>} />

            <Route path="/landing" component={LandingPage} />

            <Route
              path="/user/:accessToken/:refreshToken"
              component={UserCmp}
            />

            <Route path="/error/:errorMsg" component={ErrorCmp} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Content;
