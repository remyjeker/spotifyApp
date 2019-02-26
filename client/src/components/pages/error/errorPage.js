import React, { Component } from 'react';
import type { Match } from 'react-router-dom';

type Props = {
  match: Match
};

class ErrorPage extends Component<Props> {
  render() {
    const { match } = this.props;
    const { params } = match;
    const { message } = params;

    return (
      <div className="AppPage ErrorPage">
        <h4>An Error Occured</h4>
        <p>{message}</p>
      </div>
    );
  }
}

export default ErrorPage;
