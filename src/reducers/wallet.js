import WALLET from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return { wallet: {
      currencies: [...action.currencies],
      expenses: [...action.expenses] },
    };
  default:
    return state;
  }
}

export default wallet;
