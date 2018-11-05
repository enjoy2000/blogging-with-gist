import {
  BLOG_LOGIN_FAILED,
} from '../../../../src/features/blog/redux/constants';

import {
  loginFailed,
  reducer,
} from '../../../../src/features/blog/redux/loginFailed';

describe('blog/redux/loginFailed', () => {
  it('returns correct action by loginFailed', () => {
    expect(loginFailed()).toHaveProperty('type', BLOG_LOGIN_FAILED);
  });

  it('handles action type BLOG_LOGIN_FAILED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: BLOG_LOGIN_FAILED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
