import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_INFO:
    return { ...state,
      user: {
        email: action.email },
    };
  default:
    return state;
  }
}

export default user;
