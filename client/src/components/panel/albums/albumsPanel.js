import React, { Component } from 'react';

import ApiService from '../../../services/api';

import defaultCoverAlbum from '../../../img/default_album.png';

import '../panel.css';
import './albumsPanel.css';

type CustomMatch = {
  params: any,
  isExact: boolean,
  path: string,
  url: string
};

type Props = {
  api: ApiService,
  match: CustomMatch
};

type State = {
  albums: Array<any>
};

const noop = () => {};

class AlbumsPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.searchType = 'album';

    this.state = {
      albums: []
    };

    const { match } = this.props;
    const { params } = match;
    const { name } = params;

    this.fetchAlbums(name);
  }

  fetchAlbums = (artistName: string) => {
    const { api } = this.props;

    api.search(artistName, this.searchType).then(data => {
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

  searchType: string;

  render() {
    const { albums } = this.state;

    if (!albums.length) return <h4>No results</h4>;

    const { match } = this.props;
    const { params } = match;
    const { name } = params;

    const buildThumbnail = album => {
      const hasCover = album.images.length;
      const spCoverUrl = hasCover ? album.images[0].url : null;
      const coverUrl = hasCover ? spCoverUrl : defaultCoverAlbum;

      const hasArtist = album.artists.length;
      const artistName = hasArtist ? album.artists[0].name : name;

      const { spotify: spotifyUrl } =
        album.external_urls || 'https://open.spotify.com';

      return (
        <div className="Thumbnail AlbumsThumbnail" key={album.id}>
          <img className="Thumbnail__image" src={coverUrl} alt="album_cover" />
          <h4 className="Thumbnail__title">{album.name}</h4>
          <span className="Thumbnail__details">{artistName}</span>
          <div
            className="AlbumsThumbnail__preview"
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
      <div className="Panel__list AlbumsPanelList">
        {albums.map(album => buildThumbnail(album))}
      </div>
    );

    return (
      <div className="AppPage AlbumsPanelPage">
        <div className="AlbumsPanelPage__header">
          <h4 className="AppPage__pageTitle">{name}</h4>
          <h5>Albums</h5>
        </div>
        <div className="Panel AlbumsPanel">{buildThumbnailsList()}</div>
      </div>
    );
  }
}

export default AlbumsPanel;
