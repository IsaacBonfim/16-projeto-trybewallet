import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Headear extends React.Component {
  constructor() {
    super();

    this.getEmail = this.getEmail.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
  }

  getEmail() {
    const { receiveEmail } = this.props;

    return (
      <div>
        <span className="h-text" data-testid="email-field">
          { 'e-mail: ' }
        </span>
        <span className="user" data-testid="email-field">
          {receiveEmail}
        </span>
      </div>
    );
  }

  getTotal() {
    const { receiveExpenses } = this.props;

    return (
      <span className="h-text h-value" data-testid="total-field">
        { receiveExpenses
          .map((expense) => ({
            value: Number(expense.value),
            rate: Number(expense.exchangeRates[expense.currency].ask),
          }))
          .reduce((acc, { value, rate }) => acc + (value * rate), 0).toFixed(2) }
      </span>
    );
  }

  getCurrency() {
    const { receiveCurrency } = this.props;

    return (
      <span className="h-text h-currency" data-testid="header-currency-field">
        { ` ${receiveCurrency}` }
      </span>
    );
  }

  render() {
    return (
      <header className="header">
        <span className="title t-margin">TrybeWallet</span>
        <div className="h-container">
          { this.getEmail() }
          <div>
            { this.getTotal() }
            { this.getCurrency() }
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  receiveEmail: state.user.email,
  receiveExpenses: [...state.wallet.expenses],
  receiveCurrency: state.wallet.currency,
});

Headear.propTypes = {
  receiveEmail: PropTypes.string.isRequired,
  receiveExpenses: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  receiveCurrency: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Headear);
