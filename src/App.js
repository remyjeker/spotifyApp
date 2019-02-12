import React, { Component } from 'react';

import Header from './components/layout/header';
import Content from './components/layout/content';

import './main.css';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div className="App">
        <Header title="Spotify App" />
        <Content />
      </div>
    );
  }
}

export default App;
