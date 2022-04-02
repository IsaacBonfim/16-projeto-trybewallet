export const USER_INFO = 'USER_INFO';
export const WALLET = 'WALLET';

export const receiveUserInfo = (state) => (
  {
    type: USER_INFO,
    email: state,
  }
);

export const receiveWallet = (state) => (
  {
    type: WALLET,
    currencies: state.currencies,
    expenses: state.expenses,
  }
);
