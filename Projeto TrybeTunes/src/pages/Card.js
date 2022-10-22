import React, { Component } from 'react';
// import Search from "./Search";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { array, outro } = this.props;
    return (
      <div>
        <p>
          {`Resultado de álbuns de: ${outro}`}

        </p>
        {array.map((musc) => (
          <div className="albuns" key={ musc.artistName }>
            <Link
              data-testid={ `link-to-album-${musc.collectionId}` }
              to={ `/album/${musc.collectionId}` }
            >
              Detalhes

            </Link>
            <p>{musc.artistName}</p>
            <p>{musc.image}</p>
            <p>{musc.collectionName}</p>
            <img
              src={ musc.artworkUrl100 }
              alt={ `Capa do album ${musc.artworkUrl100} de ${musc.artistName}` }
            />
          </div>
        ))}
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.string,
  array: PropTypes.array,
}.isRequired;
export default Card;
