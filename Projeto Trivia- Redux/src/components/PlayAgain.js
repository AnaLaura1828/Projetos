import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionClearUser, timerStatusAction } from '../redux/action';

class PlayAgain extends React.Component {
  clearUserDataAndToken = async () => {
    const { clearUser, history, timerStatus } = this.props;

    await clearUser();
    await timerStatus(false);
    await localStorage.removeItem('token');
    await history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        className="redirect-button"
        onClick={ () => this.clearUserDataAndToken() }
      >
        Play Again

      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(actionClearUser()),
  timerStatus: (payload) => dispatch(timerStatusAction(payload)),
});

PlayAgain.propTypes = {
  clearUser: PropTypes.func,
  history: PropTypes.func,
  timerStatus: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(PlayAgain);
