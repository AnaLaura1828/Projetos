import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTimeLeftAction, timerStatusAction } from '../redux/action';

class Timer extends Component {
  componentDidMount() {
    const ONE_SECOND = 1000;
    const timer = setInterval(() => {
      const { secondsLeft, time } = this.props;
      const { updateTimeLeft, timerStatus, changeTimerStatus } = this.props;

      console.log('running');

      if (secondsLeft === 0) {
        updateTimeLeft(0);
        changeTimerStatus(false);
      }

      if (!timerStatus) {
        updateTimeLeft(secondsLeft);
      }

      return timerStatus && secondsLeft > 0
        ? time()
        : clearInterval(timer);
    }, ONE_SECOND);
  }

  render() {
    const { secondsLeft } = this.props;
    return (
      <h1>
        {secondsLeft}
      </h1>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateTimeLeft: (timeLeft) => dispatch(updateTimeLeftAction(timeLeft)),
  changeTimerStatus: (newTimerStatus) => dispatch(timerStatusAction(newTimerStatus)),
});

const mapStateToProps = (state) => ({
  timerStatus: state.timer.timerStatus,
});

Timer.propTypes = {
  updateTimeLeft: PropTypes.func,
  changeTimerStatus: PropTypes.func,
  timerStatus: PropTypes.bool,
  secondsLeft: PropTypes.number,
  time: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
