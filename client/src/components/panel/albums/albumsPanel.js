import React, { Component } from 'react';

import ApiService from '../../../services/api';

import defaultCoverAlbum from '../../../img/default_album.png';

import './albumsPanel.css';

type Props = {
  match: any
};

type State = {
  albums: Array<any>
};

const noop = () => {};

class AlbumsPanel extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    console.log('AlbumsPanel - props', props);

    this.apiService = new ApiService();

    this.searchType = 'album';

    this.state = {
      albums: []
    };

    this.fetchAlbums();
  }

  fetchAlbums = () => {
    const { match } = this.props;
    const { params } = match;
    const { name } = params;

    this.apiService.search(name, this.searchType).then(data => {
      const { albums } = data;
      const { items } = albums;

      this.setState({
        albums: items
      });
    });
  };

  showOnSpotify = (url: string) => {
    window.open(url);
  };

  handleClick = (spotifyUrl: string) => {
    this.showOnSpotify(spotifyUrl);
  };

  apiService: ApiService;

  searchType: string;

  render() {
    const { albums } = this.state;

    if (!albums.length) return <h4>No results</h4>;

    const { match } = this.props;
    const { params } = match;
    const { name } = params;

    const buildThumbnail = album => {
      const hasCover = album.images.length;
      const coverUrl = hasCover ? album.images[0].url : null;

      const hasArtist = album.artists.length;
      const artistName = hasArtist ? album.artists[0].name : name;

      const { spotify: spotifyUrl } =
        album.external_urls || 'https://open.spotify.com';

      return (
        <div className="AlbumsPanel__thumbnail" key={album.id}>
          {hasCover ? (
            <img
              className="AlbumsPanel__thumbnail__image"
              src={coverUrl}
              alt="album_cover"
            />
          ) : (
            <img
              className="AlbumsPanel__thumbnail__image"
              src={defaultCoverAlbum}
              alt="default_album_cover"
            />
          )}
          <h4 className="AlbumsPanel__thumbnail__title">{album.name}</h4>
          <span className="AlbumsPanel__thumbnail__artist">{artistName}</span>
          <div
            className="AlbumsPanel__thumbnail__preview"
            role="button"
            tabIndex="0"
            onClick={() => this.handleClick(spotifyUrl)}
            onKeyPress={noop}
          >
            Preview on Spotify
          </div>
        </div>
      );
    };

    const buildThumbnailsList = () => (
      <div className="AlbumsPanel__list">
        {albums.map(album => buildThumbnail(album))}
      </div>
    );

    return (
      <div className="AppPage AlbumsPanel">
        <div className="AlbumsPanel__header">
          <h3>{name}</h3>
          <h4>Albums</h4>
        </div>
        {buildThumbnailsList()}
      </div>
    );
  }
}

export default AlbumsPanel;
