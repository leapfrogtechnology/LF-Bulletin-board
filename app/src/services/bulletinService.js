import * as httpUtil from '../utils/httpUtil';
import urlConstants from '../constants/urlConstants';

export function checkLogin(data) {
  let loginUrl = urlConstants.apiBaseUrl + '/login';

  return httpUtil.post(loginUrl, data);
}

export async function addBulletin(data) {
  let addBulletinUrl = urlConstants.apiBaseUrl + '/bulletins';
  let user = JSON.parse(localStorage.getItem('user'));
  data.owner = user.name;

  return new Promise((resolve) => {
    let result = httpUtil.post(addBulletinUrl, data);
    
    resolve(result);
  });
}

export async function listBulletin() {
  let listBulletinUrl = urlConstants.apiBaseUrl + '/get-bulletins';

  return new Promise((resolve) => {
    let result = httpUtil.get(listBulletinUrl, {});

    resolve(result);
  });
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
