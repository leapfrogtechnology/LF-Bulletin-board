import axios from 'axios';

export function get(url, params = {}, headers = {}) {
  let request = {
    method: 'get',
    url: url,
    params: params
  };
  if(Object.keys(headers).length) {
    request.headers = headers;
  }

  return axios(request);
}

export function post(url, data, headers = {}) {
  let request = {
    method: 'post',
    url: url,
    data: data
  };
  if(Object.keys(headers).length) {
    request.headers = headers;
  }

  return axios(request);
}

export function put(url, data, headers = {}) {
  let request = {
    method: 'put',
    url: url,
    data: data
  };
  if(Object.keys(headers).length) {
    request.headers = headers;
  }

  return axios(request);
}

export function remove(url, headers = {}) {
  let request = {
    method: 'delete',
    url: url
  };
  if(Object.keys(headers).length) {
    request.headers = headers;
  }
  
  return axios(request);
}
