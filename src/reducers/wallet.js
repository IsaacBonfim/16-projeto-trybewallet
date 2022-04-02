import { WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      currencies: [...action.currencies],
      expenses: [...action.expenses] };
  default:
    return state;
  }
}

export default wallet;
