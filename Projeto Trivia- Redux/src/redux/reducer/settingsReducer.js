import {
  REQUEST_CATEGORIES,
  REQUEST_CATEGORIES_ERROR,
  RESPONSE_CATEGORIES,
  PLAYER_NAME_AND_EMAIL,
  SAVE_SETTINGS_CONFIG,
} from '../action';

const INITIAL_STATE = {
  stateSettings: {},
  playerName: '',
  playerEmail: '',
  loading: false,
  error: '',
  categories: [],
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_CATEGORIES_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case RESPONSE_CATEGORIES:
    return {
      ...state,
      loading: false,
      categories: action.payload,
    };
  case PLAYER_NAME_AND_EMAIL:
    return {
      ...state,
      playerName: action.payload.name,
      playerEmail: action.payload.gravatarEmail,
    };
  case SAVE_SETTINGS_CONFIG:
    return {
      ...state,
      stateSettings: action.payload,
    };
  default:
    return state;
  }
};

export default settingsReducer;
