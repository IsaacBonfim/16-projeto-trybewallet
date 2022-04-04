import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableExpenses extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
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
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const { description, tag, method, value,
              currency, exchangeRates, id } = expense;

            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: [...state.wallet.expenses],
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      tag: PropTypes.string,
      method: PropTypes.string,
      value: PropTypes.string,
      currency: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, null)(TableExpenses);
