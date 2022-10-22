import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithContext } from './RenderWithContext';
import Mock from './Mock';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('requisito 5', () => {
  test('verifica se existe um titulo', async() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
       json: jest.fn().mockResolvedValue(Mock),
       });
        await act(async () => renderWithContext(<App />));
      const linkElement = screen.getByText(/Projeto Star Wars- Trybe/i);
      const btn = screen.getByRole('button', {
        name: /filtrar/i
      })
      expect(linkElement).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
      userEvent.click(btn)
      screen.logTestingPlaygroundURL()
  });
  test('verifica se filtra os planetas', async() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
       json: jest.fn().mockResolvedValue(Mock),
       });
    await act(async () => renderWithContext(<App/>));
    const colum = screen.getByTestId('column-filter')
    const length = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btn = screen.getByRole('button', {
      name: /Filtrar/i})

      userEvent.selectOptions(colum, 'surface_water')
      userEvent.selectOptions(length, 'igual a')
      userEvent.type(value, '1')
      await waitFor(() => screen.getByText('Tatooine'))
      userEvent.click(btn)
      const role = screen.getAllByRole('row')

      expect(colum).toBeInTheDocument();
      expect(length).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
  });
  test('verifica se filtra os planetas', async() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
       json: jest.fn().mockResolvedValue(Mock),
       });
    await act(async () => renderWithContext(<App/>));
    const colum = screen.getByTestId('column-filter')
    const length = screen.getByTestId('comparison-filter')
    const value = screen.getByTestId('value-filter')
    const btn = screen.getByRole('button', {
      name: /Filtrar/i})

      userEvent.selectOptions(colum, 'surface_water')
      userEvent.selectOptions(length, 'menor que')
      userEvent.type(value, '1')
      await waitFor(() => screen.getByText('Tatooine'))
      userEvent.click(btn)
      const role = screen.getAllByRole('row')

      expect(colum).toBeInTheDocument();
      expect(length).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
  });
});

// auxilio do eliel