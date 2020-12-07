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
