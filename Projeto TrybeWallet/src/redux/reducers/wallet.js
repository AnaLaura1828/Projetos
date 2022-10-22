// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_MOEDAS, ADD_DESPESAS, PREVENT_ERROR, REMOVE_DESPESAS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_MOEDAS:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_DESPESAS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case PREVENT_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case REMOVE_DESPESAS:
    return {
      ...state,
      expenses: action.info,
    };
  default:
    return state;
  }
};

export default wallet;
