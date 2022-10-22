import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PlayAgain from '../components/PlayAgain';

import './Feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const three = 3;
    return (
      <>
        <Header />
        <div className="feedback-container">
          <h4 data-testid="feedback-total-question">{ assertions }</h4>
          <h4 data-testid="feedback-total-score">
            { score }
          </h4>
          <h3 data-testid="feedback-text">
            {assertions < three ? 'Could be better...' : 'Well Done!'}
          </h3>
          <div>
            <Link to="/ranking">
              <button
                type="button"
                className="redirect-button"
                data-testid="btn-ranking"
              >
                Ranking

              </button>
            </Link>
            <PlayAgain history={ history } />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
