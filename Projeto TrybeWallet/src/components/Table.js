import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removedThunk } from '../redux/actions';

class Table extends Component {
  handleClick = (event) => {
    const { removDispatch, stateExpense } = this.props;
    const info = { id: event.target.name, stateExpense };
    removDispatch(info);
    // console.log(info);
  }

  render() {
    const { stateExpense } = this.props;
    return (
      <div className="div-tabela">
        <table className="toda-tabela">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {stateExpense.map((elem) => (
            // tr é linha
              <tr key={ elem.id }>
                <td className="tr-1">{elem.description}</td>
                <td>{elem.tag}</td>
                <td>{elem.method}</td>
                <td>{(Number(elem.value)).toFixed(2)}</td>
                <td>{elem.currency}</td>
                <td>{(Number(elem.exchangeRates[elem.currency].ask)).toFixed(2)}</td>
                <td>
                  {(Number(elem.exchangeRates[elem.currency]
                    .ask * elem.value)).toFixed(2)}
                </td>
                <td>{elem.exchangeRates[elem.currency].name}</td>
                <td key={ elem.id }>
                  <button
                    className="btn-tabela"
                    type="button"
                    data-testid="delete-btn"
                    name={ elem.id }
                    onClick={ this.handleClick }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateExpense: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  // removDispatch: (info) => dispatch(removed(info)),
  removDispatch: (info) => dispatch(removedThunk(info)),
});

Table.propTypes = {
  stateExpense: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
