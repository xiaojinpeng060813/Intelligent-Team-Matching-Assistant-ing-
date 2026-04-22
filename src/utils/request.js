import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
});

service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.success) {
      return res;
    } else {
      console.error(res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    }
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error);
  }
);

export default service;