import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './artistsPanel.css';

import defaultCoverAlbum from '../../../img/default_album.png';

type Props = {
  artists: Array<any>
};

class ArtistsPanel extends Component<Props> {
  render() {
    const { artists } = this.props;

    if (!artists.length) return <p>No results</p>;

    const buildThumbnail = artist => {
      const { name } = artist;
      const artistLink = `/artist/${name}/albums`;
      const hasCover = artist.images.length;
      const coverUrl = hasCover ? artist.images[0].url : null;
      const { total: totalFollowers } = artist.followers;

      return (
        <Link to={artistLink} key={artist.id}>
          <div className="ArtistsPanel__thumbnail">
            {hasCover ? (
              <img
                className="ArtistsPanel__thumbnail__image"
                src={coverUrl}
                alt="artist_cover"
              />
            ) : (
              <img
                className="ArtistsPanel__thumbnail__image"
                src={defaultCoverAlbum}
                alt="default_artist_cover"
              />
            )}
            <h4 className="ArtistsPanel__thumbnail__title">{name}</h4>
            <span className="ArtistsPanel__thumbnail__followers">
              {totalFollowers} followers
            </span>
          </div>
        </Link>
      );
    };

    const buildThumbnailsList = () => (
      <div className="ArtistsPanel__list">
        {artists.map(artist => buildThumbnail(artist))}
      </div>
    );

    return <div className="ArtistsPanel">{buildThumbnailsList()}</div>;
  }
}

export default ArtistsPanel;
