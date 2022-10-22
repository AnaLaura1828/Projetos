import { verifyState } from '../../helpers';

export const RED_TELA = 'RED_TELA';
export const MENSAGEM_AVISO = 'MENSAGEM_AVISO';
export const MENSAGEM_ERROR = 'MENSAGEM_ERROR';
export const CLEAR_USER = 'CLEAR_USER';
export const CHANGE_NUMBER_QUESTION = 'CHANGE_NUMBER_QUESTION';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SAVE_USER = 'SAVE_USER';
export const CHANGE_TIMER_STATUS = 'CHANGE_TIMER_STATUS';
export const UPDATE_TIME_LEFT = 'UPDATE_TIME_LEFT';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const RESPONSE_QUESTIONS = 'RESPONSE_QUESTIONS';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const SHUFFLED_QUESTION = 'SHUFFLED_QUESTION';
export const LAST_QUESTION = 'LAST_QUESTION';
export const ADD_ASSERTION = 'ADD_ASSERTION';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const REQUEST_CATEGORIES_ERROR = 'REQUEST_CATEGORIES_ERROR';
export const RESPONSE_CATEGORIES = 'RESPONSE_CATEGORIES';
export const PLAYER_NAME_AND_EMAIL = 'PLAYER_NAME_AND_EMAIL';
export const REQUEST_QUESTION_LOADING = 'REQUEST_QUESTION_LOADING';
export const SAVE_SETTINGS_CONFIG = 'SAVE_SETTINGS_CONFIG';

export const addAssertions = () => ({ type: ADD_ASSERTION });
export const initialGame = (payload) => ({ type: RED_TELA, payload });
export const mensagem = () => ({ type: MENSAGEM_AVISO });
export const errorAction = (payload) => ({ type: MENSAGEM_ERROR, payload });
export const changeNumberQuestion = () => ({ type: CHANGE_NUMBER_QUESTION });
export const nextQuestion = () => ({ type: NEXT_QUESTION });
export const userDataAction = (userInfo) => ({ type: SAVE_USER, userInfo });
export const lastQuestionAction = () => ({ type: LAST_QUESTION });
export const timerStatusAction = (timerStatus) => (
  { type: CHANGE_TIMER_STATUS, timerStatus }
);
export const updateTimeLeftAction = (timeLeft) => ({
  type: UPDATE_TIME_LEFT,
  timeLeft,
});
export const actionClearUser = () => ({ type: CLEAR_USER });
// minha thunk

export const getApiThunkToken = () => async (dispatch) => {
  dispatch(mensagem());
  try {
    const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(URL_TOKEN);
    const response = await request.json();
    localStorage.setItem('token', response.token);
    dispatch(initialGame(response));
  } catch (erro) {
    dispatch(errorAction(erro));
  }
};

const responseInvalidToken = (payload) => ({ type: INVALID_TOKEN, payload });
const responseApiQuestions = (payload) => ({ type: RESPONSE_QUESTIONS, payload });
const requestQuestionsLoading = () => ({ type: REQUEST_QUESTION_LOADING });

export const getApiQuestions = (state, categories) => async (dispatch) => {
  dispatch(requestQuestionsLoading());
  try {
    const token = localStorage.getItem('token');
    const Aleatory = 'Aleatory';
    return dispatch(
      responseApiQuestions(await verifyState(state, token, categories, Aleatory)),
    );
  } catch (erro) {
    dispatch(responseInvalidToken(erro));
  }
};

export const correctAnswer = (payload) => ({ type: CORRECT_ANSWER, payload });
export const shuffledQuestions = (payload) => ({ type: SHUFFLED_QUESTION, payload });

const requestCategories = () => ({ type: REQUEST_CATEGORIES });
const responseCategories = (payload) => ({ type: RESPONSE_CATEGORIES, payload });

export const requestCategoriesError = (payload) => (
  { type: REQUEST_CATEGORIES_ERROR, payload }
);

export const responseCategoriesAction = () => async (dispatch) => {
  dispatch(requestCategories());

  try {
    const URL_CATEGORIES = 'https://opentdb.com/api_category.php';

    const request = await fetch(URL_CATEGORIES);
    const response = await request.json();

    dispatch(responseCategories(response.trivia_categories));
  } catch (erro) {
    dispatch(requestCategoriesError(erro));
  }
};

export const playerNameAndEmail = (payload) => ({ type: PLAYER_NAME_AND_EMAIL, payload });

export const saveSettingsConf = (payload) => ({ type: SAVE_SETTINGS_CONFIG, payload });
