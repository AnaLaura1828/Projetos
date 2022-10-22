export const ADD_USER = 'ADD_USER';
export const ADD_DESPESAS = 'ADD_DESPESAS';
export const SAVE_MOEDAS = 'SAVE_MOEDAS';
export const PREVENT_ERROR = 'PREVENT_ERRO';
export const REMOVE_DESPESAS = 'REMOVE_DESPESAS';

export const actionUser = (payload) => ({ type: 'ADD_USER', payload });

export const actionAddDespesa = (payload) => ({ type: 'ADD_DESPESAS', payload });
// curryreducer
export const actionMoeda = (payload) => ({ type: 'SAVE_MOEDAS', payload });

export const actionError = (error) => ({ type: 'PREVENT_ERROR', error });

export const actionDeleted = (info) => ({ type: 'REMOVE_DESPESAS', info });
// action creator  que retorna uma função (que será invocada pelo redux-thunk) em vez de retornar somente um objeto
export const getApi = () => {
  const myApi = fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => (
      response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))));
  return myApi;
};

export function fetchApi() {
  return (dispatch) => { // thunk declarado
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const chaves = Object.keys(data);
        dispatch(actionMoeda(chaves.filter((elem) => elem !== 'USDT')));
      });
  };
}

// thunk é uma funcao que retorna a chamada de outra funcao
// quero pega meu estado que tenho e juntar com o estado que ja tenho
export const addThunk = (payload) => async (dispatch) => {
  try {
    const response = await getApi();
    delete response.USDT;
    // payload vai receber minha info da api
    const payload2 = response;
    // quero juntar minhas info
    const keyArray = { ...payload, exchangeRates: payload2 };
    // console.log(keyArray);
    dispatch(actionAddDespesa(keyArray));
  } catch (err) {
    dispatch(actionError(err));
  }
};

// payload sao meu states
export const removedThunk = (info) => (dispatch) => {
  const { id, stateExpense } = info;
  // console.log(stateExpense);
  // estou pegando todo meu info do statexpense
  // const info2 = { ...info.stateExpense };
  const info2 = stateExpense.filter((elem) => elem.id !== Number(id));
  // console.log(typeof id);
  // console.log(info2);
  dispatch(actionDeleted(info2));
};
