import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux} from './helpers/renderWith';
import Header from '../components/Header';

const initial_state = {
    user: {
        email: 'trybe@teste.com',
    },
    wallet: {
        currency: ['USD'],
        expenses: [
            {
     id: 0,
      value: '1',
      description: 'Um dólar',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Transporte',
      exchangeRates: {
        USD: {
          code: 'USD',
          codein: 'BRL',
          name: 'Dólar Americano/Real Brasileiro',
          high: '5.3137',
          low: '5.2461',
          varBid: '-0.0078',
          pctChange: '-0.15',
          bid: '5.2703',
          ask: '5.271',
          timestamp: '1659542827',
          create_date: '2022-08-03 13:07:07',
    }
          }

    }
  ]
 }
}

describe('Verifica a pagina Header', () => {
    test('Verifica se existe o texto brl', () => {
        renderWithRouterAndRedux(<Header/>)
        const text = screen.getByTestId(/header-currency-field/i)
        expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent(/BRL/i)
    });
    test('Verifica se existe o contador', () => {
        renderWithRouterAndRedux(<Header/>, {initialState:initial_state})
        const contador = screen.queryByText(/5.27/i)

        expect(contador).toBeInTheDocument();
        expect(contador).toHaveTextContent('5.27')
        // screen.logTestingPlaygroundURL()
    });
    test('Verifica se o email ta na tela', () => {
        renderWithRouterAndRedux(<Header/>, {initialState: initial_state})
        const email = screen.getByTestId('email-field')
        expect(email).toHaveTextContent('trybe@teste.com')
    })
});
