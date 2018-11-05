import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_FETCH_GIST_BEGIN,
  BLOG_FETCH_GIST_SUCCESS,
  BLOG_FETCH_GIST_FAILURE,
  BLOG_FETCH_GIST_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  fetchGist,
  dismissFetchGistError,
  reducer,
} from '../../../../src/features/blog/redux/fetchGist';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/fetchGist', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGist succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGist())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_FETCH_GIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_FETCH_GIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGist fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGist({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_FETCH_GIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_FETCH_GIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGistError', () => {
    const expectedAction = {
      type: BLOG_FETCH_GIST_DISMISS_ERROR,
    };
    expect(dismissFetchGistError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_FETCH_GIST_BEGIN correctly', () => {
    const prevState = { fetchGistPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistPending).toBe(true);
  });

  it('handles action type BLOG_FETCH_GIST_SUCCESS correctly', () => {
    const prevState = { fetchGistPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistPending).toBe(false);
  });

  it('handles action type BLOG_FETCH_GIST_FAILURE correctly', () => {
    const prevState = { fetchGistPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistPending).toBe(false);
    expect(state.fetchGistError).toEqual(expect.anything());
  });

  it('handles action type BLOG_FETCH_GIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGistError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistError).toBe(null);
  });
});

