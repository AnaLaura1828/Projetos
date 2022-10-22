import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux} from './helpers/renderWith';
import Table from '../components/Table';

describe('Verifica a pagina Table', () => {
    test('Verifica se tem alguma th', () => {
        renderWithRouterAndRedux(<Table/>);
        const th = screen.getByRole('columnheader', {
            name: /descrição/i
          })
        expect(th).toBeInTheDocument();
    });
});
