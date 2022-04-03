import { WALLET_EXPENSES, WALLET_CURRENCIES, FAIL, EXCHANGE } from '../actions';

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
      expenses: [...action.expenses],
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
  default:
    return state;
  }
}

export default walletInfo;
