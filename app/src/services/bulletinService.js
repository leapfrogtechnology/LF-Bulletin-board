import {filter, each} from 'lodash';

import * as httpUtil from '../utils/httpUtil';
import urlConstants from '../constants/urlConstants';

import defaultImage from '../assets/images/logo_leapfrog.svg';

export function checkLogin(data) {
  let loginUrl = urlConstants.apiBaseUrl + '/login';

  return httpUtil.post(loginUrl, data);
}

export async function addBulletin(data) {
  let addBulletinUrl = urlConstants.apiBaseUrl + '/bulletins';
  let user = JSON.parse(localStorage.getItem('user'));
  data.owner = (user && user.name) || '';

  return new Promise((resolve) => {
    let result = httpUtil.post(addBulletinUrl, data);
    
    resolve(result);
  });
}

export async function listBulletin() {
  let listBulletinUrl = urlConstants.apiBaseUrl + '/bulletins';
  let result = await httpUtil.get(listBulletinUrl, {});

  each(result.data.data, (item) => {
    item.activeStatus = item.activeStatus? true:false;
  });

  return result;
}

export async function deleteBulletin(bulletinId) {
  let deleteBulletinUrl = urlConstants.apiBaseUrl + '/bulletins/' + bulletinId;

  return new Promise((resolve) => {
    let result = httpUtil.remove(deleteBulletinUrl);

    resolve(result);
  });
}

export async function editBulletin(bulletinId, data) {
  let editBulletinUrl = urlConstants.apiBaseUrl + '/bulletins/' + bulletinId;

  return new Promise((resolve) => {
    let result = httpUtil.put(editBulletinUrl, data);

    resolve(result);
  });
}

export function validateAdmin (data) {
  const {googleLoginUrl} = urlConstants;

  let valiDateAdminUrl = googleLoginUrl;

  return new Promise((resolve) => {
    let result = httpUtil.post(valiDateAdminUrl, data);

    resolve(result);
  });
}

export async function logOut () {
  
  let logoutUrl = urlConstants.apiBaseUrl + '/logout';
  let refreshToken = localStorage.getItem('refreshToken');
  let data = {
    authorization: 'Bearer ' + refreshToken
  };

  return new Promise((resolve) => {
    let result = httpUtil.remove(logoutUrl, data);

    resolve(result);
  });
}

export function filterActiveList (list) {
  let activeList = filter(list, (item) => item.activeStatus);
  
  return activeList;
}

export function removeIframeBackgroundImage () {
  let iframeHolderDiv = document.getElementsByClassName('iframe-holder')[0];
  iframeHolderDiv.style.background = 'none';
  iframeHolderDiv.style.backgroundSize = "none";
}

export function addIframeBackgroundImage () {
  let iframeHolderDiv = document.getElementsByClassName('iframe-holder')[0];
  iframeHolderDiv.style.background = "url('"+ defaultImage +"') center center no-repeat";
  iframeHolderDiv.style.backgroundSize = "50%";
}