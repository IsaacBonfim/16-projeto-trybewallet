import { WALLET_EXPENSES, WALLET_CURRENCIES, FAIL,
  EXCHANGE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currency: 'BRL',
  currencies: [],
  expenses: [],
  errorMessage: '',
  exchange: {},
};

function walletInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.some((expense) => expense.id === action.expenses.id) ? (
        state.expenses.map((expense) => {
          if (expense.id === action.expenses.id) {
            return { ...expense, ...action.expenses };
          }
          return expense;
        })
      ) : [...state.expenses, action.expenses],
    };
  case WALLET_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case FAIL:
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  case EXCHANGE:
    return {
      ...state,
      exchange: { ...action.exchange },
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  default:
    return state;
  }
}

export default walletInfo;
