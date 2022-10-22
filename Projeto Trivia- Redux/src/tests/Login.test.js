import React from 'react'
import {screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login'
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js'
import { createMemoryHistory } from "history";
const historyMock = createMemoryHistory();
describe('Login page test', () => {
  it('Button play starts disabled on Login render.', ()=>{
    renderWithRouterAndRedux(<Login history={historyMock}/>)
    expect(screen.getByTestId('btn-play')).toBeDisabled()
  })
  it('Button play is enabled on name and email filling.', async ()=>{
    const { history } = renderWithRouterAndRedux(<Login history={historyMock} />)
    const nameEl = screen.getByTestId('input-player-name')
    const emailEl = screen.getByTestId('input-gravatar-email')
    userEvent.type(nameEl, 'barbara')
    userEvent.type(emailEl, 'barbara@trybe.com')
    const playButton = screen.getByTestId('btn-play')
    expect(playButton).not.toBeDisabled()
    userEvent.click(playButton)

  })
  it('Button settings present.', ()=> {
    renderWithRouterAndRedux(<Login history={historyMock}/>)
    const settingsButton = screen.getByTestId('btn-settings')
    expect(settingsButton).toBeInTheDocument()
    userEvent.click(settingsButton)
  })
})
describe('App page test', () => {
  it('Loading name field on App component', ()=>{
    renderWithRouterAndRedux(<App />)
    expect(screen.getByLabelText('Nome:')).toBeInTheDocument()
  })
})

