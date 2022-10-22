import {
  RESPONSE_QUESTIONS,
  INVALID_TOKEN,
  CHANGE_NUMBER_QUESTION,
  NEXT_QUESTION,
  SHUFFLED_QUESTION,
  LAST_QUESTION,
  REQUEST_QUESTION_LOADING,
} from '../action';

const INITIAL_STATE = {
  category: '',
  question: '',
  wrongAnswers: [],
  rightAnswer: '',
  questionNumber: 0,
  responseCode: '',
  results: [],
  shuffledQuestions: [],
  loadingResponseQuestions: false,
};

const questionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTION_LOADING:
    return {
      ...state,
      loadingResponseQuestions: true,
    };
  case RESPONSE_QUESTIONS:
    return {
      ...state,
      loadingResponseQuestions: false,
      category: action.payload.results[state.questionNumber].category,
      question: action.payload.results[state.questionNumber].question,
      wrongAnswers: action.payload.results[state.questionNumber].incorrect_answers,
      rightAnswer: action.payload.results[state.questionNumber].correct_answer,
      questionNumber: state.questionNumber,
      responseCode: action.payload.response_code,
      results: action.payload.results,
    };
  case INVALID_TOKEN:
    return {
      ...state,
      responseCode: action.payload.response_code,
    };
  case CHANGE_NUMBER_QUESTION:
    return {
      ...state,
      questionNumber: state.questionNumber + 1,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      category: state.results[state.questionNumber].category,
      question: state.results[state.questionNumber].question,
      wrongAnswers: state.results[state.questionNumber].incorrect_answers,
      rightAnswer: state.results[state.questionNumber].correct_answer,
    };
  case SHUFFLED_QUESTION:
    return {
      ...state,
      shuffledQuestions: action.payload,
    };
  case LAST_QUESTION:
    return {
      ...state,
      questionNumber: 0,
    };
  default:
    return state;
  }
};

export default questionReducer;
