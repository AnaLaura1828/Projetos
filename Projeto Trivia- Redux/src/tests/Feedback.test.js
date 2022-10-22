import React from 'react'
import {screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js'
import { createMemoryHistory } from "history";
import Feedback from '../pages/Feedback';
const historyMock = createMemoryHistory();
import {within} from '@testing-library/dom'

describe('Testing feedback page', () => {
  it('renders the score, assertions and message', () => {

    renderWithRouterAndRedux(<Feedback history={historyMock}/>)
  
    const message = screen.getByText(/Could be better.../i);
    const assertions = screen.getByTestId("feedback-total-question");
    const score = screen.getByTestId("feedback-total-score");
  
    expect(message).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();

  })
  it('renders the message "Well Done!" when assertions > 3', () => {
    const initialStateMock = {
      player: {
      name:"",
      assertions: 4,
      score: 4,
      },
      questions: {}
    };

    renderWithRouterAndRedux(<Feedback history={historyMock}/>, initialStateMock)
    const message = screen.getByText(/Well Done!/i);
    const assertions = screen.getByTestId("feedback-total-question");
    const score = screen.getByTestId("feedback-total-score");

    const valueAssertions = within(assertions).getByText('4')
  
    expect(message).toBeInTheDocument();
    expect(valueAssertions).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  })
})