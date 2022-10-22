import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import {
  getApiThunkToken,
  userDataAction,
  timerStatusAction,
  getApiQuestions,
  playerNameAndEmail as playerNameAndEmailAction,
} from '../redux/action';

import logo from '../trivia.png';
import '../App.css';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  disableButton = () => {
    const { name, gravatarEmail } = this.state;

    return !(name.length > 0 && gravatarEmail.length > 0);
  }

  onClick = () => {
    const { history, playerNameAndEmail } = this.props;
    const state = { ...this.state };
    playerNameAndEmail(state);
    history.push('/settings');
  }

  handleSubmit = async () => {
    const {
      dispatchToken,
      userData,
      history,
      timerStatus,
      getQuestions,
    } = this.props;
    const { name, gravatarEmail } = this.state;
    const code = md5(gravatarEmail).toString();
    const profilePic = `https://www.gravatar.com/avatar/${code}`;

    userData({ name, gravatarEmail, profilePic });
    await dispatchToken();
    if (!localStorage.getItem('ranking')) {
      localStorage
        .setItem('ranking', JSON.stringify([]));
    }
    await getQuestions('playGame');
    history.push('/game');
    await timerStatus(true);
  }

  preventDefault = (event) => {
    event.preventDefault();
  }

  render() {
    const {
      name,
      gravatarEmail,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form onSubmit={ () => this.preventDefault() }>
          <div className="name-email-container">
            <label htmlFor="input-name">
              Nome:
              <input
                id="input-name"
                name="name"
                className="input-text"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Digite seu nome"
                data-testid="input-player-name"
              />
            </label>
            <div className="space" />
            <label htmlFor="input-email">
              Email:
              <input
                id="input-email"
                name="gravatarEmail"
                className="input-text"
                value={ gravatarEmail }
                onChange={ this.handleChange }
                placeholder="Digite seu E-mail"
                data-testid="input-gravatar-email"
              />
            </label>
            <div className="space" />
            <button
              type="button"
              className="redirect-button"
              disabled={ this.disableButton() }
              onClick={ () => this.handleSubmit() }
              data-testid="btn-play"
            >

              Play

            </button>
          </div>
        </form>
        <div className="buttons">
          <button
            type="button"
            className="redirect-button"
            onClick={ () => this.onClick() }
            disabled={ this.disableButton() }
            data-testid="btn-settings"
          >
            Settings
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: () => dispatch(getApiThunkToken()),
  userData: (userInfo) => dispatch(userDataAction(userInfo)),
  timerStatus: (status) => dispatch(timerStatusAction(status)),
  playerNameAndEmail: (state) => dispatch(playerNameAndEmailAction(state)),
  getQuestions: (payload) => dispatch(getApiQuestions(payload)),
});

Login.propTypes = {
  dispatchToken: PropTypes.func,
  history: PropTypes.func,
  userData: PropTypes.func,
  timerStatus: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
