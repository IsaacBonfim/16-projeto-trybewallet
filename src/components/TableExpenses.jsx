import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableExpenses extends React.Component {
  render() {
    // const { expenses, dispatch } = this.props;

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
      </table>
    );
  }
}

// const mapStateToProps = (state) => ({
//   expenses: [...state.wallet.expenses],
// });

// TableExpenses.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   expenses: PropTypes.arrayOf(
//     PropTypes.shape({
//       description: PropTypes.string,
//       tag: PropTypes.string,
//       method: PropTypes.string,
//       value: PropTypes.string,
//       currency: PropTypes.string,
//     }),
//   ).isRequired,
// };

export default connect()(TableExpenses);
