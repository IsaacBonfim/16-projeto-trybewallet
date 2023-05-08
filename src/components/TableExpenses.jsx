import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';
import "../styles/Table.css"

class TableExpenses extends React.Component {
  render() {
    const { expenses, editExpense, dispatch } = this.props;

    return (
      <table className="w-table">
        <thead className="w-thead">
          <tr className="w-tr">
            <th className="w-th">Descrição</th>
            <th className="w-th">Tag</th>
            <th className="w-th">Método de pagamento</th>
            <th className="w-th">Valor</th>
            <th className="w-th">Moeda</th>
            <th className="w-th">Câmbio utilizado</th>
            <th className="w-th">Valor convertido</th>
            <th className="w-th">Moeda de conversão</th>
            <th className="w-th">Editar / Excluir</th>
          </tr>
        </thead>
        <tbody className="w-tbody">
          { expenses.map((expense) => {
            const { description, tag, method, value,
              currency, exchangeRates, id } = expense;

            return (
              <tr key={ id } className="w-tr">
                <td className="w-td">{description}</td>
                <td className="w-td">{tag}</td>
                <td className="w-td">{method}</td>
                <td className="w-td">{Number(value).toFixed(2)}</td>
                <td className="w-td">{exchangeRates[currency].name.split('/')[0]}</td>
                <td className="w-td">{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td className="w-td">
                  {
                    (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                  }
                </td>
                <td className="w-td">Real</td>
                <td className="w-td">
                  <button
                    type="button"
                    className="w-table-btn"
                    data-testid="edit-btn"
                    onClick={ () => editExpense(expense) }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="w-table-btn"
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
