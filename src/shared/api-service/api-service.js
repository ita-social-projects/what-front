import axios from 'axios';

import { BASE_URL } from './config.js';
import { requestInterceptor, responseInterceptor } from './interceptors.js';

axios.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
axios.interceptors.response.use(responseInterceptor, (error) => Promise.reject(error));

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
      throw Error(`Request failed. ${response.statusText}`);
    }
    return response.data;
  };

  static load = (url) => ApiService.sendRequest(`${BASE_URL}${url}`, 'GET');

  static create = (url, data) => ApiService.sendRequest(`${BASE_URL}${url}`, 'POST', data);

  static update = (url, data) => ApiService.sendRequest(`${BASE_URL}${url}`, 'PUT', data);

  static remove = (url) => ApiService.sendRequest(`${BASE_URL}${url}`, 'DELETE');
}
