import { paths } from '@/shared';
import { BASE_URL } from './config.js';
import { Cookie } from '../../utils/index.js';

export const requestInterceptor = (config) => {
  const requestConfig = { ...config };

  if (requestConfig.url !== `${BASE_URL}/accounts/auth` && requestConfig.url !== `${BASE_URL}/accounts/reg`) {
    const token = Cookie.get('jwt');

    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  if (requestConfig.data) {
    requestConfig.headers['Content-Type'] = 'application/json';
  }

  return requestConfig;
};

export const responseInterceptor = (response) => {
  const authHeader = response.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    Cookie.set('jwt', token, 1);
  }
  return response;
};

export const responseErrorInterceptor = (error) => {
  const requestUrl = error.response.config.url.split('/api')[1];

  if (error.response.status === 401 && requestUrl !== '/accounts/auth') {
    Cookie.del('jwt');
    Cookie.del('user');
    window.location.href = paths.AUTH;
  }

  if (typeof error.response.data === 'string') {
    return Promise.reject(error.response.data);
  }

  if (error.response.data.error) {
    return Promise.reject(error.response.data.error.message);
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject('An error occurred');
};
