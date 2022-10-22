import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Question history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Game;
