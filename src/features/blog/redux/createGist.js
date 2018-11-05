import {
  BLOG_CREATE_GIST_BEGIN,
  BLOG_CREATE_GIST_SUCCESS,
  BLOG_CREATE_GIST_FAILURE,
  BLOG_CREATE_GIST_DISMISS_ERROR,
} from './constants';
import gistApi from '../api'

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function createGist(data) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: BLOG_CREATE_GIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      
      // prepare gist data
      const gistData = {
        files: {
          [data.title + '.html']: {
            content: data.content
          }
        },
        public: false
      }

      const doRequest = gistApi.post('/gists', gistData)
      doRequest.then(
        (res) => {
          dispatch({
            type: BLOG_CREATE_GIST_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: BLOG_CREATE_GIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissCreateGistError() {
  return {
    type: BLOG_CREATE_GIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case BLOG_CREATE_GIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createGistPending: true,
        createGistError: null,
      };

    case BLOG_CREATE_GIST_SUCCESS:
      // The request is success
      return {
        ...state,
        createGistPending: false,
        createGistError: null,
        createdGist: action.data.data
      };

    case BLOG_CREATE_GIST_FAILURE:
      // The request is failed
      return {
        ...state,
        createGistPending: false,
        createGistError: action.data.error,
      };

    case BLOG_CREATE_GIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createGistError: null,
      };

    default:
      return state;
  }
}
