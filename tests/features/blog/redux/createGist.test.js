import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_CREATE_GIST_BEGIN,
  BLOG_CREATE_GIST_SUCCESS,
  BLOG_CREATE_GIST_FAILURE,
  BLOG_CREATE_GIST_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  createGist,
  dismissCreateGistError,
  reducer,
} from '../../../../src/features/blog/redux/createGist';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/createGist', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createGist succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createGist())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_CREATE_GIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_CREATE_GIST_SUCCESS);
      });
  });

  it('dispatches failure action when createGist fails', () => {
    const store = mockStore({});

    return store.dispatch(createGist({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_CREATE_GIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_CREATE_GIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateGistError', () => {
    const expectedAction = {
      type: BLOG_CREATE_GIST_DISMISS_ERROR,
    };
    expect(dismissCreateGistError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_CREATE_GIST_BEGIN correctly', () => {
    const prevState = { createGistPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_GIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createGistPending).toBe(true);
  });

  it('handles action type BLOG_CREATE_GIST_SUCCESS correctly', () => {
    const prevState = { createGistPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_GIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createGistPending).toBe(false);
  });

  it('handles action type BLOG_CREATE_GIST_FAILURE correctly', () => {
    const prevState = { createGistPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_GIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createGistPending).toBe(false);
    expect(state.createGistError).toEqual(expect.anything());
  });

  it('handles action type BLOG_CREATE_GIST_DISMISS_ERROR correctly', () => {
    const prevState = { createGistError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_GIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createGistError).toBe(null);
  });
});

