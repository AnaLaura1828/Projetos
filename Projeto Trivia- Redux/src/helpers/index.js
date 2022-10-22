export const countPoints = (numberOfQuestion, results, secondsLeft) => {
  const NUMBER_10 = 10;
  const EASY = 1;
  const MEDIUM = 2;
  const HARD = 3;

  switch (results[numberOfQuestion].difficulty) {
  case 'easy':
    return NUMBER_10 + (EASY * secondsLeft);
  case 'medium':
    return NUMBER_10 + (MEDIUM * secondsLeft);
  case 'hard':
    return NUMBER_10 + (HARD * secondsLeft);
  default:
    return 0;
  }
};

export const verifyToken = (responseCode, history) => {
  const INVALID_TOKEN = 3;

  if (responseCode === INVALID_TOKEN) {
    localStorage.removeItem('token');
    console.log('Error: invalid token');
    history.push('/');
  }
};

const verifyType = (stateType) => {
  const type = stateType === 'Multiple choice' ? 'multiple' : 'boolean';
  return type;
};

export const verifyState = async (state, token, categories, Aleatory) => {
  if (state === 'playGame') {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  }
  if (state.difficulty === Aleatory && state.type === Aleatory) {
    const findId = categories.find((category) => state.category === category.name);
    const URL_CATEGORY = `https://opentdb.com/api.php?amount=5&category=${findId.id}&token=${token}`;
    const request = await fetch(URL_CATEGORY);
    const response = await request.json();
    return response;
  }
  if (state.category === Aleatory && state.type === Aleatory) {
    const URL_DIFFICULTY = `https://opentdb.com/api.php?amount=5&difficulty=${state.difficulty}&token=${token}`;
    const request = await fetch(URL_DIFFICULTY);
    const response = await request.json();
    return response;
  }
  if (state.category === Aleatory && state.difficulty === Aleatory) {
    const URL_TYPE = `https://opentdb.com/api.php?amount=5&type=${verifyType(state.type)}&token=${token}`;
    const request = await fetch(URL_TYPE);
    const response = await request.json();
    return response;
  }
  if (state.type === Aleatory) {
    const findId = categories.find((category) => state.category === category.name);
    const URL_CATEGORY_DIFFICULTY = `https://opentdb.com/api.php?amount=5&category=${findId.id}&difficulty=${state.difficulty}&token=${token}`;
    const request = await fetch(URL_CATEGORY_DIFFICULTY);
    const response = await request.json();
    return response;
  }
  if (state.difficulty === Aleatory) {
    const findId = categories.find((category) => state.category === category.name);
    const URL_CATEGORY_TYPE = `https://opentdb.com/api.php?amount=5&category=${findId.id}&type=${verifyType(state.type)}&token=${token}`;
    const request = await fetch(URL_CATEGORY_TYPE);
    const response = await request.json();
    return response;
  }
  if (state.category === Aleatory) {
    const URL_DIFFICULTY_TYPE = `https://opentdb.com/api.php?amount=5&difficulty=${state.difficulty}&type=${verifyType(state.type)}&token=${token}`;
    const request = await fetch(URL_DIFFICULTY_TYPE);
    const response = await request.json();
    return response;
  }
  const findId = categories.find((category) => state.category === category.name);
  const URL_CATEGORY_DIFFICULTY_TYPE = `https://opentdb.com/api.php?amount=5&category=${findId.id}&difficulty=${state.difficulty}&type=${verifyType(state.type)}&token=${token}`;
  const request = await fetch(URL_CATEGORY_DIFFICULTY_TYPE);
  const response = await request.json();
  return response;
};
