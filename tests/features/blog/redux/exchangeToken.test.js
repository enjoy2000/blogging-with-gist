import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_EXCHANGE_TOKEN_BEGIN,
  BLOG_EXCHANGE_TOKEN_SUCCESS,
  BLOG_EXCHANGE_TOKEN_FAILURE,
  BLOG_EXCHANGE_TOKEN_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  exchangeToken,
  dismissExchangeTokenError,
  reducer,
} from '../../../../src/features/blog/redux/exchangeToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/exchangeToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when exchangeToken succeeds', () => {
    const store = mockStore({});

    return store.dispatch(exchangeToken())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_EXCHANGE_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_EXCHANGE_TOKEN_SUCCESS);
      });
  });

  it('dispatches failure action when exchangeToken fails', () => {
    const store = mockStore({});

    return store.dispatch(exchangeToken({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_EXCHANGE_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_EXCHANGE_TOKEN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissExchangeTokenError', () => {
    const expectedAction = {
      type: BLOG_EXCHANGE_TOKEN_DISMISS_ERROR,
    };
    expect(dismissExchangeTokenError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_EXCHANGE_TOKEN_BEGIN correctly', () => {
    const prevState = { exchangeTokenPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_EXCHANGE_TOKEN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exchangeTokenPending).toBe(true);
  });

  it('handles action type BLOG_EXCHANGE_TOKEN_SUCCESS correctly', () => {
    const prevState = { exchangeTokenPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_EXCHANGE_TOKEN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exchangeTokenPending).toBe(false);
  });

  it('handles action type BLOG_EXCHANGE_TOKEN_FAILURE correctly', () => {
    const prevState = { exchangeTokenPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_EXCHANGE_TOKEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exchangeTokenPending).toBe(false);
    expect(state.exchangeTokenError).toEqual(expect.anything());
  });

  it('handles action type BLOG_EXCHANGE_TOKEN_DISMISS_ERROR correctly', () => {
    const prevState = { exchangeTokenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_EXCHANGE_TOKEN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exchangeTokenError).toBe(null);
  });
});

