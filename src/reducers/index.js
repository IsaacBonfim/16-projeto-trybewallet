import { combineReducers } from 'redux';
import userEmail from './user';
import walletInfo from './wallet';

const rootReducer = combineReducers({
  user: userEmail,
  wallet: walletInfo,
});

export default rootReducer;
