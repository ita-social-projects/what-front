import axios from 'axios';

import { BASE_URL } from './config.js';
import { requestInterceptor, responseErrorInterceptor, responseInterceptor } from './interceptors.js';

axios.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
axios.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export class ApiService {
  static sendRequest = async (
    url,
    method,
    data = null,
    headers = {},
  ) => {
    const response = await axios(url, {
      method,
      data,
      headers: headers ?? {},
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw response;
    }
    return response.data;
  };

  static load = (url) => ApiService.sendRequest(`${BASE_URL}${url}`, 'GET');

  static create = (url, data) => ApiService.sendRequest(`${BASE_URL}${url}`, 'POST', data);

  static update = (url, data) => ApiService.sendRequest(`${BASE_URL}${url}`, 'PUT', data);

  static remove = (url) => ApiService.sendRequest(`${BASE_URL}${url}`, 'DELETE');
}
