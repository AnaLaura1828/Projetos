import {
  RED_TELA,
  MENSAGEM_ERROR,
  CLEAR_USER,
  SAVE_USER,
  CORRECT_ANSWER,
  ADD_ASSERTION,
} from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: {},
  error: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RED_TELA:
    return {
      ...state,
      token: action.payload,
    };
  case MENSAGEM_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case SAVE_USER: {
    return {
      ...state,
      name: action.userInfo.name,
      gravatarEmail: action.userInfo.gravatarEmail,
      profilePic: action.userInfo.profilePic,
    };
  }
  case CLEAR_USER: {
    return {
      ...state,
      name: '',
      gravatarEmail: '',
      profilePic: '',
      score: '', // esta zerando o score do estado nao do localStorage
      assertions: 0,
    };
  }
  case CORRECT_ANSWER:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ADD_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
