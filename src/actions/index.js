export const USER_INFO = 'USER_INFO';
export const WALLET = 'WALLET';

export const receiveUserInfo = (state) => (
  {
    type: USER_INFO,
    state,
  }
);

export const receiveWallet = (state) => (
  {
    type: WALLET,
    state,
  }
);