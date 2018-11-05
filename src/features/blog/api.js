import axios from 'axios';

const baseUrl = 'https://api.github.com/'

const gistApi = axios.create ({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

gistApi.interceptors.request.use (
  function (config) {
    const token = localStorage.getItem('token'); // TODO redux-persistence
    if (token) config.headers.Authorization = `token ${token}`;
    return config;
  },
  function (error) {
    console.log(error, 'error from axios adapter')
    
    return Promise.reject (error);
  }
);

export default gistApi
