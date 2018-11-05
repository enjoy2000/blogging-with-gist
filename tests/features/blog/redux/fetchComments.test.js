import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_FETCH_COMMENTS_BEGIN,
  BLOG_FETCH_COMMENTS_SUCCESS,
  BLOG_FETCH_COMMENTS_FAILURE,
  BLOG_FETCH_COMMENTS_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  fetchComments,
  dismissFetchCommentsError,
  reducer,
} from '../../../../src/features/blog/redux/fetchComments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/fetchComments', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchComments succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchComments())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_FETCH_COMMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_FETCH_COMMENTS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchComments fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchComments({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_FETCH_COMMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_FETCH_COMMENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchCommentsError', () => {
    const expectedAction = {
      type: BLOG_FETCH_COMMENTS_DISMISS_ERROR,
    };
    expect(dismissFetchCommentsError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_FETCH_COMMENTS_BEGIN correctly', () => {
    const prevState = { fetchCommentsPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_COMMENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCommentsPending).toBe(true);
  });

  it('handles action type BLOG_FETCH_COMMENTS_SUCCESS correctly', () => {
    const prevState = { fetchCommentsPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_COMMENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCommentsPending).toBe(false);
  });

  it('handles action type BLOG_FETCH_COMMENTS_FAILURE correctly', () => {
    const prevState = { fetchCommentsPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_COMMENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCommentsPending).toBe(false);
    expect(state.fetchCommentsError).toEqual(expect.anything());
  });

  it('handles action type BLOG_FETCH_COMMENTS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchCommentsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_FETCH_COMMENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCommentsError).toBe(null);
  });
});

