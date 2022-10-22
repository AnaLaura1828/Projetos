import { CHANGE_TIMER_STATUS, UPDATE_TIME_LEFT } from '../action';

const INITIAL_STATE = {
  timerStatus: false,
  timeLeft: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_TIMER_STATUS:
    return {
      ...state,
      timerStatus: action.timerStatus,
    };
  case UPDATE_TIME_LEFT:
    return {
      ...state,
      timeLeft: action.timeLeft,
    };
  default:
    return state;
  }
};

export default timerReducer;
