import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux} from './helpers/renderWith';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Verifcando pagina de Login', () => {
  test('Verifica se é a rota /', () => {
   const { history } = renderWithRouterAndRedux(<App />);
    // expect(true).toBe(true);
    expect(history.location.pathname).toBe('/');
  });
  test('Verifica se tem o texto na pagina', () => {
    renderWithRouterAndRedux(<App/>)
    const text = screen.getByText(/Login/i)
    expect(text).toBeInTheDocument();
  })
  test('Verifica se existe dois input', () => {
    renderWithRouterAndRedux(<App />);
    screen.logTestingPlaygroundURL()
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('Verifica se o email é valido', () => {
    renderWithRouterAndRedux(<App/>);
    const btn = screen.getByRole('button', {
      name: /entrar/i
  })
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');

  userEvent.type(email, '123')
  userEvent.type(senha, '123')
  expect(btn).toHaveAttribute('disabled')
});
test('Verifica se a senha é valida', () => {
  renderWithRouterAndRedux(<App/>);
  const btn = screen.getByRole('button', {
    name: /entrar/i
})
 const email = screen.getByTestId('email-input');
 const pass = screen.getByTestId('password-input');

 userEvent.type(email, 'testando@apptrybe.com')
 userEvent.type(pass, '123456')
  expect(btn).not.toHaveAttribute('disabled')
});
test('Verifica se ao clicar no botao a pagina é redirecionada', () => {
  const { history } = renderWithRouterAndRedux(<App/>);
  const btn = screen.getByRole('button', {
    name: /entrar/i
})
 const email = screen.getByTestId('email-input');
 const pass = screen.getByTestId('password-input');

 userEvent.type(email, 'testando@apptrybe.com')
 userEvent.type(pass, '123456')
  expect(btn).not.toHaveAttribute('disabled')
  userEvent.click(btn)
  expect(history.location.pathname).toBe('/carteira')
});
});
