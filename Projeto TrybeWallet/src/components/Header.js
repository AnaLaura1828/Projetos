import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { headerState, expensesState } = this.props;
    // console.log(expensesState);
    return (
      <div>
        <header className="header">
          <p data-testid="email-field">{headerState}</p>
          <p data-testid="total-field">
            Despesa total: R$
            {expensesState.reduce((acc, cur) => {
              const valor = Number(cur.value);
              const moeda = cur.currency;
              // acesso o aks de dentro da moeda
              const atualMoeda = Number(cur.exchangeRates[moeda].ask);
              const mult = valor * atualMoeda;
              // console.log(mult);
              acc += mult;
              return Math.round(acc * 100) / 100;
            }, 0).toFixed(2)}

          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}
// ler meu estado
const mapStateToProps = (state) => ({
  // headerState é minha prop
  headerState: state.user.email,
  expensesState: state.wallet.expenses,
});
Header.propTypes = {
  headerState: PropTypes.string,
  expensesState: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);

// AJUDA DO ELIEL
