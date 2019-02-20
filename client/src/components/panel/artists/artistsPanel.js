import React, { Component } from 'react';

import './artistsPanel.css';

import defaultCoverAlbum from '../../../img/default_album.png';

type Props = {
  artists: Array<any>;
};

class ArtistsPanel extends Component<Props> {
  render() {
    const { artists } = this.props;

    if (!artists.length) return <p>No results</p>;

    const buildThumbnail = (artist) => {
      const hasCover = artist.images.length;
      const coverUrl = (hasCover) ? artist.images[0].url : null;
      const { total : totalFollowers } = artist.followers;

      return (
        <div className="ArtistsPanel__thumbnail" key={artist.id}>
          {
            hasCover ?
              <img className="ArtistsPanel__thumbnail__image" src={coverUrl} alt="artist_cover" />
              : <img className="ArtistsPanel__thumbnail__image" src={defaultCoverAlbum} alt="default_artist_cover" />
          }
          <h4 className="ArtistsPanel__thumbnail__title">{ artist.name }</h4>
          <span className="ArtistsPanel__thumbnail__followers">{ totalFollowers } followers</span>
        </div>
      )
    };

    const buildThumbnailsList = () => (
      <div className="ArtistsPanel__list">
        { artists.map(artist => buildThumbnail(artist)) }
      </div>
    );

    return (
      <div className="ArtistsPanel">
        { buildThumbnailsList() }
      </div>
    );
  }
}

export default ArtistsPanel;
