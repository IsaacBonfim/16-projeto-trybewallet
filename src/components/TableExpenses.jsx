import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class TableExpenses extends React.Component {
  render() {
    const { expenses, editExpense, dispatch } = this.props;

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
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editExpense(expense) }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(removeExpense(id)) }
                  >
                    Excluir
                  </button>
                </td>
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
  editExpense: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
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
