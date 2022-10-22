import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  timerStatusAction, correctAnswer as correctAnswerAction,
  nextQuestion as nextQuestionAction,
  shuffledQuestions as shuffledQuestionsAction,
  changeNumberQuestion as changeNumberQuestionAction,
  lastQuestionAction,
  addAssertions as addAssertionsAction,
} from '../redux/action';
import { countPoints, verifyToken } from '../helpers';
import Timer from './Timer';
import './Question.css';
import PlayAgain from './PlayAgain';

class Question extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.state = {
      clicked: false,
      secondsLeft: 30,
    };
  }

  async componentDidMount() {
    const { responseCode, history } = this.props;

    verifyToken(responseCode, history);
    this.shuffleAnswers();
  }

  componentDidUpdate() {
    const { responseCode, history } = this.props;
    const invalidToken = 3;
    if (responseCode === invalidToken) {
      localStorage.removeItem('token');
      console.log('Error: invalid token');
      history.push('/');
    }
  }

  NextClicked = () => {
    const { stateQuestions, stateName, statePicture, stateScore } = this.props;
    const max = 5;
    if (stateQuestions > max) {
      const prevent = JSON.parse(localStorage.getItem('ranking'));
      const objPlayer = { name: stateName, score: stateScore, picture: statePicture };
      prevent.push(objPlayer);
      return localStorage.setItem('ranking', JSON.stringify(prevent));
    }
    console.log('working');
  }

  time = () => {
    this.setState((prevState) => ({
      ...prevState,
      secondsLeft: prevState.secondsLeft - 1,
    }));
  }

  shuffleAnswers() {
    const {
      wrongAnswers,
      rightAnswer,
      shuffledQuestionsFunc,
    } = this.props;

    const newArray = wrongAnswers.map((data, index) => ({
      data,
      prevIndex: index,
      correct: false,
    }));
    newArray.push({
      data: rightAnswer,
      prevIndex: 3,
      correct: true,
    });
    const shuffleNumber = 0.5;
    const shuffled = newArray.sort(() => Math.random() - shuffleNumber);

    shuffledQuestionsFunc(shuffled);
  }

  handleClick({ target }) {
    const {
      correctAnswer,
      questionNumber,
      results,
      changeTimerStatus,
      addAssertions,
    } = this.props;

    const { secondsLeft } = this.state;

    this.setState({ clicked: true });

    changeTimerStatus(false);

    if (target.className === 'type-1') {
      correctAnswer(countPoints(questionNumber, results, secondsLeft));
      addAssertions();
    }
  }

  async handleNextClick() {
    const { nextQuestion, questionNumber, history, changeNumberQuestion,
      lastQuestion, stateName, statePicture, stateScore } = this.props;
    const lastQuestionIndex = 4;
    this.setState({ clicked: false });
    const max = 4;
    if (questionNumber < lastQuestionIndex) {
      await changeNumberQuestion();
      await nextQuestion();
      await this.shuffleAnswers();
    } else if (questionNumber === max) {
      const prevent = JSON.parse(localStorage.getItem('ranking'));
      const objPlayer = { name: stateName, score: stateScore, picture: statePicture };
      prevent.push(objPlayer);
      localStorage.setItem('ranking', JSON.stringify(prevent));
      lastQuestion();
      history.push('/feedback');
    }
  }

  render() {
    const {
      category,
      question,
      timeLeft,
      shuffledQuestions,
      history,
    } = this.props;

    const {
      clicked,
      secondsLeft,
    } = this.state;

    return (
      <div className="question-container">
        <Timer
          secondsLeft={ secondsLeft }
          time={ this.time }
        />
        <div className="question-box">
          <div data-testid="question-category">{category}</div>
          <div data-testid="question-text">{question}</div>
          <div className="answer-container" data-testid="answer-options">
            {shuffledQuestions.map(({ data, prevIndex, correct }) => {
              if (correct === false) {
                return (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${prevIndex}` }
                    className={ clicked ? 'incorrect' : 'type-2' }
                    key={ prevIndex }
                    disabled={ timeLeft === 0 } // timeLeft === 0
                    onClick={ (event) => this.handleClick(event) }
                  >
                    {data}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  data-testid="correct-answer"
                  className={ clicked ? 'correct' : 'type-1' }
                  key={ prevIndex }
                  disabled={ timeLeft === 0 } // timeLeft === 0
                  onClick={ (event) => this.handleClick(event) }
                >
                  {data}
                </button>
              );
            })}
          </div>
        </div>
        <div className="redirect-container">
          <PlayAgain history={ history } />
          <div>
            {clicked ? (
              <button
                data-testid="btn-next"
                className="redirect-button"
                type="button"
                onClick={ this.handleNextClick }
              >
                Next
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeNumberQuestion: () => dispatch(changeNumberQuestionAction()),
  nextQuestion: () => dispatch(nextQuestionAction()),
  changeTimerStatus: (newTimerStatus) => dispatch(timerStatusAction(newTimerStatus)),
  correctAnswer: (payload) => dispatch(correctAnswerAction(payload)),
  shuffledQuestionsFunc: (payload) => dispatch(shuffledQuestionsAction(payload)),
  lastQuestion: () => dispatch(lastQuestionAction()),
  addAssertions: () => dispatch(addAssertionsAction()),
});

const mapStateToProps = (state) => ({
  category: state.questions.category,
  question: state.questions.question,
  wrongAnswers: state.questions.wrongAnswers,
  rightAnswer: state.questions.rightAnswer,
  responseCode: state.questions.responseCode,
  questionNumber: state.questions.questionNumber,
  results: state.questions.results,
  timerStatus: state.timer.timerStatus,
  timeLeft: state.timer.timeLeft,
  shuffledQuestions: state.questions.shuffledQuestions,
  stateName: state.player.name,
  statePicture: state.player.profilePic,
  stateScore: state.player.score,
  loadingResponseQuestions: state.questions.loadingResponseQuestions,
});

Question.propTypes = {
  history: PropTypes.func,
  category: PropTypes.string,
  question: PropTypes.string,
  wrongAnswers: PropTypes.arrayOf(PropTypes.string),
  rightAnswer: PropTypes.string,
  getQuestions: PropTypes.func,
  timerStatus: PropTypes.func,
  responseCode: PropTypes.string,
  addAssertions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
