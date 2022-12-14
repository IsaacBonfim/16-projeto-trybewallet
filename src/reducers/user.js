import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userEmail(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userEmail;
