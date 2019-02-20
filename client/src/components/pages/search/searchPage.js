import React, { Component } from 'react';

import ApiService from '../../../services/api';
import ArtistsPanel from '../../panel/artists';

import './searchPage.css';

type Props = {};

type State = {
  results: Array<any>
};

class SearchPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.apiService = new ApiService();

    this.searchType = 'artist';

    this.state = {
      results: []
    };

    console.log('SearchPage - props', props);
  }

  handleKeyPress = (event: any) => {
    const { key, target } = event;
    if (key === 'Enter') {
      const { value } = target;

      this.fetchArtists(value);
    }
  };

  fetchArtists = (keywork: string) => {
    this.apiService.search(keywork, this.searchType).then(data => {
      const { artists } = data;
      const { items } = artists;

      this.setState({
        results: items
      });
    });
  };

  apiService: ApiService;

  searchType: string;

  render() {
    const inputPlaceholder = 'Search for an artist...';
    const { results } = this.state;
    const resultsLength = results.length;

    return (
      <div className="AppPage SearchPage">
        <div className="SearchPage__wrapper">
          <input
            type="text"
            className="SearchPage__searchInput"
            onKeyPress={this.handleKeyPress}
            placeholder={inputPlaceholder}
          />

          <ArtistsPanel artists={results} />

          <p>Results : {resultsLength}</p>
        </div>
      </div>
    );
  }
}

export default SearchPage;