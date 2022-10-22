import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionClearUser } from '../redux/action';

import './Ranking.css';

class Ranking extends React.Component {
  getLogin = () => {
    const { dispatchUser, history } = this.props;
    dispatchUser();
    history.push('/');
  }

  render() {
    // const { dispatchUser } = this.props;
    const getRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    getRanking.sort((a, b) => b.score - a.score);

    return (
      <section className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <span>
            {getRanking.map(({ name, score, picture }, index) => (
              <div key={ index } className="player-container">
                <div>
                  <img scr={ picture } alt="gravatar" />
                  <div className="space" />
                  <h3 data-testid={ `player-name-${index}` }>{name}</h3>
                </div>
                <h3 data-testid={ `player-score-${index}` }>{score}</h3>
              </div>
            ))}
          </span>
        </div>
        <div>
          <button
            type="button"
            className="redirect-button"
            data-testid="btn-go-home"
            onClick={ this.getLogin }
          >
            Ir para Login
          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUser: () => dispatch(actionClearUser()),
});

Ranking.propTypes = {
  dispatchUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
