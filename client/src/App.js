import React, { Component } from 'react';

import Header from './components/layout/header';
import Content from './components/layout/content';

import './main.css';

type Props = {};

class App extends Component<Props> {
  render() {
    const appName: string = 'Spotify Artists Search';

    return (
      <div className="App isFullScreen">
        <Header title={appName} />
        <Content />
      </div>
    );
  }
}

export default App;
