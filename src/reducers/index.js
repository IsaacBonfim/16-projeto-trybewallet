import { combineReducers } from 'redux';
import userEmail from './user';
import wallet from './wallet';

const rootReducer = combineReducers({
  user: userEmail,
  wallet });

export default rootReducer;
