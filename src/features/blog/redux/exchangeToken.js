import {
  BLOG_EXCHANGE_TOKEN_BEGIN,
  BLOG_EXCHANGE_TOKEN_SUCCESS,
  BLOG_EXCHANGE_TOKEN_FAILURE,
  BLOG_EXCHANGE_TOKEN_DISMISS_ERROR,
} from './constants';
import axios from 'axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function exchangeToken(code) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: BLOG_EXCHANGE_TOKEN_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const data = {
        client_id: '70ccaab5620f7524bd49',
        client_secret: '5e9e214319465688a29cfe63219e118cdfda73e1',  // never do this in PROD pls
        code
      }
      console.warn('Secret on client side!!!!! How come this could be a frontend test :\'(')
      const doRequest = axios.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', data, {headers: {
        accept: 'application/json'
      }})
      doRequest.then(
        (res) => {
          dispatch({
            type: BLOG_EXCHANGE_TOKEN_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: BLOG_EXCHANGE_TOKEN_FAILURE,
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
export function dismissExchangeTokenError() {
  return {
    type: BLOG_EXCHANGE_TOKEN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case BLOG_EXCHANGE_TOKEN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        exchangeTokenPending: true,
        exchangeTokenError: null,
      };

    case BLOG_EXCHANGE_TOKEN_SUCCESS:
      // The request is success
      const token = action.data.data.split('&')[0].split('=')[1]
      localStorage.setItem('token', token)  // TODO big one
      return {
        ...state,
        exchangeTokenPending: false,
        exchangeTokenError: null,
        user: token
      };

    case BLOG_EXCHANGE_TOKEN_FAILURE:
      // The request is failed
      return {
        ...state,
        exchangeTokenPending: false,
        exchangeTokenError: action.data.error,
      };

    case BLOG_EXCHANGE_TOKEN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        exchangeTokenError: null,
      };

    default:
      return state;
  }
}
