import React, { Component } from 'react';

import ApiService from '../../../services/api';
import ArtistsPanel from '../../panel/artists';

import './searchPage.css';

type Props = {
  api: ApiService
};

type State = {
  results: Array<any>
};

class SearchPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.searchType = 'artist';

    this.state = {
      results: []
    };
  }

  handleKeyPress = (event: any) => {
    const { key, target } = event;

    if (key === 'Enter') {
      const { value } = target;

      this.fetchArtists(value);
    }
  };

  fetchArtists = (keywork: string) => {
    const { api } = this.props;

    api.search(keywork, this.searchType).then(data => {
      const { artists } = data;
      const { items } = artists;

      this.setState({
        results: items
      });
    });
  };

  searchType: string;

  render() {
    const inputPlaceholder = 'Search for an artist...';
    const { results } = this.state;

    return (
      <div className="AppPage SearchPage">
        <div className="SearchPage__wrapper">
          <h4>Search</h4>
          <input
            type="text"
            className="SearchPage__searchInput"
            onKeyPress={this.handleKeyPress}
            placeholder={inputPlaceholder}
          />
          <ArtistsPanel {...this.props} artists={results} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
