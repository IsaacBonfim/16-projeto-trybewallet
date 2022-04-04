import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: '',
      payment: '',
      category: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getCurrencies());
  }

  handleChange({ target }) {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, payment, category } = this.state;
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

          <label htmlFor="currency" name="Moeda">
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

          <label htmlFor="payment">
            Forma de Pagamento
            <select
              name="payment"
              data-testid="method-input"
              value={ payment }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria
            <select
              name="category"
              data-testid="tag-input"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  receiveCurrencies: state.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  receiveCurrencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
