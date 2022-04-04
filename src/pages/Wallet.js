import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, receiveExpenses } from '../actions';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      id: 0,
      oldId: null,
      change: false,
      exchangeRates: null,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getCurrencies());
  }

  editExpense = (expense) => {
    const { id } = this.state;
    this.setState({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      id: expense.id,
      oldId: id,
      change: true,
      exchangeRates: expense.exchangeRates,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  saveExpense() {
    const { dispatch } = this.props;

    dispatch(getCurrencies());

    const { receiveExchange } = this.props;

    const { value, description, currency, method,
      tag, id, oldId, exchangeRates } = this.state;

    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeRates || receiveExchange,
    };

    dispatch(receiveExpenses(expense));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      id: id < oldId ? oldId : id + 1,
      oldId: id,
      change: false,
      exchangeRates: null,
    });
  }

  render() {
    const { value, description, currency, method, tag, change } = this.state;
    const { receiveCurrencies } = this.props;

    return (
      <>
        <Header />

        <form>

          <label htmlFor="value">
            Valor
            <input
              type="text"
              name="value"
              data-testid="value-input"
              placeholder="0"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição da Despesa
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              { receiveCurrencies.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>
              )) }
            </select>
          </label>

          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            type="button"
            onClick={ this.saveExpense }
          >
            { change ? 'Editar despesa' : 'Adicionar despesa' }
          </button>

        </form>
        <TableExpenses editExpense={ this.editExpense } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  receiveCurrencies: state.wallet.currencies,
  receiveExchange: state.wallet.exchange,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  receiveCurrencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  receiveExchange: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
