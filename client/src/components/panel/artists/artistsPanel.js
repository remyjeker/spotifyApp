/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import defaultCoverAlbum from '../../../img/default_album.png';

import './artistsPanel.css';

type Props = {
  artists: Array<any>
};

class ArtistsPanel extends Component<Props> {
  render() {
    const { artists } = this.props;

    if (!artists.length) return <p>No results</p>;

    const buildRatingTemplate = () => {
      const table = [];
      const supposedToBeRatingValue = Math.floor(Math.random() * 5);

      for (let i = 0; i < 5; i++) {
        const isActiveIcon =
          supposedToBeRatingValue >= i ? 'active' : 'default';
        const starIconClassName = [
          'ArtistsPanel__rating__icon',
          isActiveIcon
        ].join(' ');

        table.push(<div key={i} className={starIconClassName} />);
      }

      return table;
    };

    const buildThumbnail = artist => {
      const { name } = artist;
      const artistLink = `/artist/${name}/albums`;
      const hasCover = artist.images.length;
      const spCoverUrl = hasCover ? artist.images[0].url : null;
      const coverUrl = hasCover ? spCoverUrl : defaultCoverAlbum;
      const { total: totalFollowers } = artist.followers;

      return (
        <Link to={artistLink} key={artist.id}>
          <div className="ArtistsPanel__thumbnail">
            <img
              className="ArtistsPanel__thumbnail__image"
              src={coverUrl}
              alt="default_artist_cover"
            />
            <h4 className="ArtistsPanel__thumbnail__title">{name}</h4>
            <span className="ArtistsPanel__thumbnail__followers">
              {totalFollowers} followers
            </span>
            <div className="ArtistsPanel__rating">{buildRatingTemplate()}</div>
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
