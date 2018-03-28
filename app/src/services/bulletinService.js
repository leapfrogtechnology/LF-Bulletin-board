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
  let loginData = {
    username: "ayush",
    password: "ghimire"
  };
  // let tokenData = await getToken(loginData);
  // token = tokenData.data.data.tokens.accessToken;
  data.owner = "ayush"
  // let headers = {
  //   Authorization: "Bearer " + token
  // };
  return new Promise((resolve,reject) => {
    let result = httpUtil.post(addBulletinUrl, data, {});
    resolve(result);
  });
}

export async function listBulletin() {
  debugger;
  let listBulletinUrl = urlConstants.baseUrl + '/bulletins';
  return new Promise((resolve,reject) => {
    let result = httpUtil.get(listBulletinUrl, {}, {});
    resolve(result);
  });
}

export async function deleteBulletin(bulletinId) {
  debugger;
  let listBulletinUrl = urlConstants.baseUrl + '/bulletins/' + bulletinId;
  return new Promise((resolve,reject) => {
    let result = httpUtil.remove(listBulletinUrl, {}, {});
    resolve(result);
  });
}
