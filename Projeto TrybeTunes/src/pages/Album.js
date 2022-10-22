import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    musicas: [],
    nameArtist: '',
    albumArtist: '',
  }

  componentDidMount() {
    this.musics();
  }

  musics = async () => {
    const { match: { params: { id } } } = this.props;
    const apiMusic = await getMusics(id);
    const [indice, ...musicas] = apiMusic; // isolando o valor do meu primeiro index inteiro
    this.setState({ musicas,
      nameArtist: indice.artistName,
      albumArtist: indice.collectionName });
  }

  render() {
    const { nameArtist, albumArtist, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p data-testid="artist-name">{nameArtist}</p>
        <p data-testid="album-name">{albumArtist}</p>
        <div>
          {musicas.map((mus) => (
            <MusicCard
              key={ mus.trackId }
              trackId={ mus.trackId }
              trackName={ mus.trackName }
              src={ mus.previewUrl }
              data={ mus }
            />
          ))}
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.string,
}.isRequired;
export default Album;

// ajuda rogerio
