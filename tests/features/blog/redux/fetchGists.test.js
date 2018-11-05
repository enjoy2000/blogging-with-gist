import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_FETCH_GISTS_BEGIN,
  BLOG_FETCH_GISTS_SUCCESS,
  BLOG_FETCH_GISTS_FAILURE,
  BLOG_FETCH_GISTS_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  fetchGists,
  dismissFetchGistsError,
  reducer,
} from '../../../../src/features/blog/redux/fetchGists';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/fetchGists', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGists succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGists())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_FETCH_GISTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_FETCH_GISTS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGists fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGists({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_FETCH_GISTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_FETCH_GISTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGistsError', () => {
    const expectedAction = {
      type: BLOG_FETCH_GISTS_DISMISS_ERROR,
    };
    expect(dismissFetchGistsError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_FETCH_GISTS_BEGIN correctly', () => {
    const prevState = { fetchGistsPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GISTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistsPending).toBe(true);
  });

  it('handles action type BLOG_FETCH_GISTS_SUCCESS correctly', () => {
    const prevState = { fetchGistsPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GISTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistsPending).toBe(false);
  });

  it('handles action type BLOG_FETCH_GISTS_FAILURE correctly', () => {
    const prevState = { fetchGistsPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GISTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistsPending).toBe(false);
    expect(state.fetchGistsError).toEqual(expect.anything());
  });

  it('handles action type BLOG_FETCH_GISTS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGistsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_GISTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistsError).toBe(null);
  });
});

