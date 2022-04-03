export const USER_INFO = 'USER_INFO';
export const WALLET_EXPENSES = 'WALLET_EXPENSES';
export const WALLET_CURRENCIES = 'WALLET_CURRENCIES';
export const FAIL = 'FAIL';
export const EXCHANGE = 'EXCHANGE';

export const receiveUserInfo = (state) => (
  {
    type: USER_INFO,
    email: state,
  }
);

export const receiveExpenses = (state) => (
  {
    type: WALLET_EXPENSES,
    expenses: state,
  }
);

export const receiveCurrencies = (state) => (
  {
    type: WALLET_CURRENCIES,
    currencies: state,
  }
);

export const errorMessage = (state) => (
  {
    type: FAIL,
    erroMessage: state,
  }
);

export const getCurrencies = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((item) => item !== 'USDT');

      dispatch(receiveCurrencies(currencies));
      dispatch({
        type: EXCHANGE,
        exchange: data,
      });
    } catch (error) {
      dispatch(errorMessage(error.message));
    }
  }
);
