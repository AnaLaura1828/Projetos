import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from './Card';

class Search extends Component {
    state = {
      artistName: '',
      outro: '',
      disabledButton: true,
      array: [],
    };

    componentDidMount() {
      this.AlbumSearchAPI();
    }

    valitedButton = (event) => {
      const valor2 = event.target.value;
      const maxValue = 2;
      if (valor2.length >= maxValue) {
        this.setState({
          disabledButton: false,
          artistName: valor2,
          outro: valor2,
        });
      } else {
        this.setState({
          disabledButton: true,
          artistName: valor2,
        });
      }
    }

  AlbumSearchAPI = async () => {
    this.setState({ artistName: '' });
    const { artistName } = this.state;
    const api = await searchAlbumsAPI(artistName);
    this.setState({ array: api });
  }

  render() {
    const { artistName, array, outro, disabledButton,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="pesquisa">
          Digite o nome da banda ou artista
          <input
            data-testid="search-artist-input"
            placeholder="name"
            type="text"
            value={ artistName }
            onChange={ this.valitedButton }
          />
        </label>
        <button
          data-testid="search-artist-button"
          name="button"
          type="button"
          disabled={ disabledButton }
          onClick={ this.AlbumSearchAPI }
        >
          Pesquisar
        </button>
        <section>
          {array.length !== 0
            ? <Card array={ array } outro={ outro } /> : 'Nenhum álbum foi encontrado'}
        </section>
      </div>
    );
  }
}

export default Search;
