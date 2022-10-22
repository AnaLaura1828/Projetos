import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Mensagem from './Mensagem';

class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  }

  favoriteMusic = async () => {
    const { data } = this.props;
    this.setState({ loading: true });
    await addSong(data);
    this.setState({ loading: false, check: true });
    this.favoriteSongs();
  }

  favoriteSongs = async () => {
    const { data } = this.props;
    this.setState({ check: true });
    await getFavoriteSongs(data);
  }

  render() {
    const { loading, check } = this.state;
    const { previewUrl, trackName, trackId } = this.props;
    return (
      <div>
        {/* se o loading for verdadeiro ele vai renderizar a mensagem carregando, se nao ele renderiza o resto da pagina */}
        {loading ? <Mensagem /> : (
          <p>
            <p>
              {trackName}
            </p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track
                kind="captions"
              />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="label-favorita">
              <input
                text="Favorita"
                type="checkbox"
                onChange={ this.favoriteMusic }
                checked={ check }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </p>
        )}
      </div>
    );
  }
}
MusicCard.propTypes = {
  key: PropTypes.string,
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  loading: PropTypes.bool,
}.isRequired;
export default MusicCard;
