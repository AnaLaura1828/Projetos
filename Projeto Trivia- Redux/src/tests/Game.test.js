import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js'
import { createMemoryHistory } from "history";
const historyMock = createMemoryHistory();
import {within} from '@testing-library/dom'
import Header from '../components/Header';
import {screen } from '@testing-library/react'

describe('Testing game page', () => {
  it('should render the user name and picture on the screen', () => {
    const initialStateMock = {
      player: {
      name:"Teste",
      assertions: 4,
      score: 4,
      gravatarEmail:"teste@teste",
      profilePic: "https://www.gravatar.com/avatar/820a8bea9dd560de28006a3fbae62ec3",
      },
      questions: {}
    };

    renderWithRouterAndRedux(<Header history={historyMock}/>, initialStateMock)

    const userName = screen.getByText('Teste');
    const picURL = screen.getByRole('img');

    expect(userName).toBeInTheDocument();
    expect(picURL.src !== "").toBeTruthy();


  })
})