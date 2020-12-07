import { BASE_URL } from './config.js';
import { getCookie } from '@/utils/index.js';

export const requestInterceptor = (config) => {
  const requestConfig = { ...config };

  if (requestConfig.url !== `${BASE_URL}/accounts/auth` && requestConfig.url !== `${BASE_URL}/accounts/reg`) {
    const token = getCookie('jwt');

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
    document.cookie = `jwt=${token};max-age=86400`;
  }
  return response;
};