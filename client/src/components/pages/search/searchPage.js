import React, { Component } from 'react';

import './searchPage.css';

type Props = {};

class SearchPage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    console.log('SearchPage - props', props);
  }

  handleChange = (event: any) => {
    event.preventDefault();

    const { value } = event.target;

    console.log('changes', value);
  };

  handleKeyPress = (event: any) => {
    const { key } = event;

    if (key === 'Enter') {
      console.log('search', event);
    }
  };

  render() {
    const inputPlaceholder = 'Search for an artist';

    return (
      <div className="SearchPage">
        <div className="SearchPage__wrapper">
          <input
            type="text"
            className="SearchPage__searchInput"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            placeholder={inputPlaceholder}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
