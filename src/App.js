import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {
  title?: string
}

class App extends Component<Props>  {

  // eslint-disable-next-line no-useless-constructor
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      title = 'default title',
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h4>{title}</h4>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
