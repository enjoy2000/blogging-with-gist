import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  BLOG_CREATE_COMMENT_BEGIN,
  BLOG_CREATE_COMMENT_SUCCESS,
  BLOG_CREATE_COMMENT_FAILURE,
  BLOG_CREATE_COMMENT_DISMISS_ERROR,
} from '../../../../src/features/blog/redux/constants';

import {
  createComment,
  dismissCreateCommentError,
  reducer,
} from '../../../../src/features/blog/redux/createComment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('blog/redux/createComment', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createComment succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createComment())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_CREATE_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_CREATE_COMMENT_SUCCESS);
      });
  });

  it('dispatches failure action when createComment fails', () => {
    const store = mockStore({});

    return store.dispatch(createComment({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', BLOG_CREATE_COMMENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', BLOG_CREATE_COMMENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateCommentError', () => {
    const expectedAction = {
      type: BLOG_CREATE_COMMENT_DISMISS_ERROR,
    };
    expect(dismissCreateCommentError()).toEqual(expectedAction);
  });

  it('handles action type BLOG_CREATE_COMMENT_BEGIN correctly', () => {
    const prevState = { createCommentPending: false };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_COMMENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCommentPending).toBe(true);
  });

  it('handles action type BLOG_CREATE_COMMENT_SUCCESS correctly', () => {
    const prevState = { createCommentPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_COMMENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCommentPending).toBe(false);
  });

  it('handles action type BLOG_CREATE_COMMENT_FAILURE correctly', () => {
    const prevState = { createCommentPending: true };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_COMMENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCommentPending).toBe(false);
    expect(state.createCommentError).toEqual(expect.anything());
  });

  it('handles action type BLOG_CREATE_COMMENT_DISMISS_ERROR correctly', () => {
    const prevState = { createCommentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: BLOG_CREATE_COMMENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createCommentError).toBe(null);
  });
});

