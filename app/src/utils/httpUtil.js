import axios from 'axios';

import * as bulletinUtil from './bulletinUtil';
import urlConstants from '../constants/urlConstants';
import textConstants from '../constants/textConstants';

/**
 * Http Get.
 *
 * @param {*} url
 * @param {*} [params={}]
 * @returns {Promise}
 */
export function get(url, params = {}) {
  const request = {
    method: 'get',
    url: url,
    params: params
  };

  return axios(request);
}

/**
 * Http POST.
 *
 * @param {*} url
 * @param {*} data
 * @returns  {Promise}
 */
export function post(url, data) {
  const request = {
    method: 'post',
    url: url,
    data: data
  };

  return axios(request);
}

/**
 * Http Put.
 *
 * @param {*} url
 * @param {*} data
 * @returns {Promise}
 */
export function put(url, data) {
  const request = {
    method: 'put',
    url: url,
    data: data
  };

  return axios(request);
}

/**
 * Http Delete.
 *
 * @param {*} url
 * @param {*} [data={}]
 * @returns {Promise}
 */
export function remove(url, data = {}) {
  const request = {
    method: 'delete',
    data,
    url
  };

  return axios(request);
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;

    if (
      error.response.status === textConstants.UNAUTHORIZED_CODE &&
      error.response.data.error.message === textConstants.ACCESS_TOKEN_EXPIRE
    ) {
      const refreshToken = localStorage.getItem('refreshToken');
      const tokenRequest = {
        method: 'post',
        url: urlConstants.apiBaseUrl + '/refresh',
        data: {
          authorization: 'Bearer ' + refreshToken
        }
      };

      return axios(tokenRequest).then(({ data }) => {
        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = 'Bearer ' + data.accessToken;

        return axios(originalRequest);
      });
    } else if (
      originalRequest.url !== urlConstants.googleLoginUrl &&
      ((error.response.status === textConstants.UNAUTHORIZED_CODE &&
        error.response.data.error.message === textConstants.REFRESH_TOKEN_EXPIRE) ||
        (error.response.status === textConstants.NOT_FOUND &&
          error.response.data.error.message === textConstants.USER_NOT_REGISTERED))
    ) {
      bulletinUtil.logout();
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken') || null;

    if (accessToken !== null || accessToken !== undefined) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
