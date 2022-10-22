import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, addThunk } from '../redux/actions';
import '../App.css';

const myTag = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: myTag,
  }

  componentDidMount() {
    const { dispatchCurr } = this.props;
    dispatchCurr(); // enviando a action
  }

  handleClick = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatchDespesas } = this.props;

    const objEstado = { id, value, description, currency, method, tag };
    dispatchDespesas(objEstado);
    // console.log(objEstado);
    this.setState({ id: id + 1 });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: myTag,
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      // name vai ser a key e o value é o valor de cada
      // ela é global, inves de fazer um por um
      [name]: value,
    });
  }

  render() {
    const { stateMoedas } = this.props;
    // pego meu estado e passo para o value
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form className="form-carteira">
          <div>
            <label className="label-valor" htmlFor="addDespesa">
              Digite o valor
              <input
                className="input-valor"
                data-testid="value-input"
                // value é minha key
                name="value"
                id="add-despesa"
                onChange={ this.handleChange }
                value={ value }
                type="number"
              />
            </label>
          </div>
          <div>
            <label className="label-descricao" htmlFor="descricaoDespesa">
              Adicione uma descrição
              <input
                className="input-descricao"
                data-testid="description-input"
                name="description"
                id="descricao-despesa"
                onChange={ this.handleChange }
                value={ description }
              />
            </label>
          </div>
          <label htmlFor="select">
            Selecione a moeda
            <select
              className="select-moeda"
              data-testid="currency-input"
              id="selected"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              { stateMoedas && stateMoedas
                .map((elem) => (<option key={ elem }>{elem}</option>))}

            </select>
          </label>
          <label htmlFor="add-method">
            Selecione a forma de pagamento
            <select
              className="select-pagamento"
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>
                Dinheiro
              </option>
              <option>
                Cartão de crédito
              </option>
              <option>
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="add-tag">
            Selecione uma categoria
            <select
              className="select-categoria"
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>
                Alimentação
              </option>
              <option>
                Lazer
              </option>
              <option>
                Trabalho
              </option>
              <option>
                Transporte
              </option>
              <option>
                Saúde
              </option>
            </select>
          </label>
          <div>
            <button
              className="add-despesa"
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateMoedas: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurr: () => dispatch(fetchApi()),
  dispatchDespesas: (payload) => dispatch(addThunk(payload)),
});

WalletForm.propTypes = {
  dispatchCurr: PropTypes.func.isRequired,
  dispatchDespesas: PropTypes.func.isRequired,
  stateMoedas: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

// ajuda do Eliel
