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
      <h4 data-testid="email-field">
        {`e-mail: ${receiveEmail}`}
      </h4>
    );
  }

  getTotal() {
    const { receiveExpenses } = this.props;

    return (
      <span data-testid="total-field">
        {`Despesas Totais: ${receiveExpenses.reduce((acc, value) => acc + value, 0)} `}
      </span>
    );
  }

  getCurrency() {
    // const { receiveCurrency } = this.props;

    return (
      <span data-testid="header-currency-field">
        BRL
      </span>
    );
  }

  render() {
    return (
      <header>
        <span>TrybeWallet</span>
        { this.getEmail() }
        { this.getTotal() }
        { this.getCurrency() }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  receiveEmail: state.user.email,
  receiveExpenses: [...state.wallet.expenses],
  receiveCurrency: [...state.wallet.currencies],
});

Headear.propTypes = {
  receiveEmail: PropTypes.string.isRequired,
  receiveExpenses: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
  // receiveCurrency: PropTypes.arrayOf(
  //   PropTypes.string,
  // ).isRequired,
};

export default connect(mapStateToProps, null)(Headear);
