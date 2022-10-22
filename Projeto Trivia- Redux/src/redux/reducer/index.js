import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionReducer from './questionReducer';
import timerReducer from './timerReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  questions: questionReducer,
  timer: timerReducer,
  settings: settingsReducer,
});

export default rootReducer;
