// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  BLOG_LOGIN_FAILED,
} from './constants';

export function loginFailed() {
  return {
    type: BLOG_LOGIN_FAILED,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case BLOG_LOGIN_FAILED:
      return {
        ...state,
        user: null,
        loginErrors: ['Cannot login']
      };

    default:
      return state;
  }
}
