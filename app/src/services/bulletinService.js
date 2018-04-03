import * as httpUtil from '../utils/httpUtil';
import urlConstants from '../constants/urlConstants';

export function checkLogin(data) {
  let loginUrl = urlConstants.baseUrl + '/login';

  return httpUtil.post(loginUrl, data);
}

export function getToken(data) {
  let loginUrl = urlConstants.baseUrl + '/login';

  return new Promise((resolve, reject) => {
    let result = httpUtil.post(loginUrl, data);

    resolve(result);
  });
}

export async function addBulletin(data) {
  let token = "";
  let addBulletinUrl = urlConstants.baseUrl + '/bulletins';
  data.owner = 'ayush'

  return new Promise((resolve,reject) => {
    let result = httpUtil.post(addBulletinUrl, data, {});

    resolve(result);
  });
}

export async function listBulletin() {
  let listBulletinUrl = urlConstants.baseUrl + '/bulletins';

  return new Promise((resolve,reject) => {
    let result = httpUtil.get(listBulletinUrl, {}, {});

    resolve(result);
  });
}

export async function deleteBulletin(bulletinId) {
  let deleteBulletinUrl = urlConstants.baseUrl + '/bulletins/' + bulletinId;

  return new Promise((resolve,reject) => {
    let result = httpUtil.remove(deleteBulletinUrl, {}, {});

    resolve(result);
  });
}

export async function editBulletin(bulletinId, data) {

  let editBulletinUrl = urlConstants.baseUrl + '/bulletins/' + bulletinId;

  return new Promise((resolve,reject) => {
    let result = httpUtil.put(editBulletinUrl, data, {});

    resolve(result);
  });
}
