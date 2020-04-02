/* eslint-disable require-await */
import { filter, each, orderBy, cloneDeep } from 'lodash';

import * as httpUtil from '../utils/httpUtil';
import { getUserLocalStorageData } from '../utils/bulletinUtil';

import urlConstants from '../constants/urlConstants';

/**
 * Check Login.
 *
 * @param {*} data
 * @returns {Promise}
 */
export function checkLogin(data) {
  const loginUrl = urlConstants.apiBaseUrl + '/login';

  return httpUtil.post(loginUrl, data);
}

/**
 * Add Bulletin.
 *
 * @param {*} data
 * @returns {Promise}
 */
export async function addBulletin(data) {
  const addBulletinUrl = urlConstants.apiBaseUrl + '/bulletins';
  const user = getUserLocalStorageData();

  data.owner = (user && user.name) || '';

  return new Promise(resolve => {
    const result = httpUtil.post(addBulletinUrl, data);

    resolve(result);
  });
}

/**
 * List Bulletin.
 *
 * @returns {Promise}
 */
export async function listBulletin() {
  const listBulletinUrl = urlConstants.apiBaseUrl + '/bulletins';
  const result = await httpUtil.get(listBulletinUrl, {});

  each(result.data.data, item => {
    item.activeStatus = item.activeStatus ? true : false;
  });

  return result;
}

/**
 * Delete Bulletin.
 *
 * @param {*} bulletinId
 * @returns {Promise}
 */
export async function deleteBulletin(bulletinId) {
  const deleteBulletinUrl = urlConstants.apiBaseUrl + '/bulletins/' + bulletinId;

  return new Promise(resolve => {
    const result = httpUtil.remove(deleteBulletinUrl);

    resolve(result);
  });
}

/**
 * Edit Bulletin.
 *
 * @param {*} bulletinId
 * @param {*} data
 * @returns {Promise}
 */
export async function editBulletin(bulletinId, data) {
  const editBulletinUrl = urlConstants.apiBaseUrl + '/bulletins/' + bulletinId;

  return new Promise(resolve => {
    const result = httpUtil.put(editBulletinUrl, data);

    resolve(result);
  });
}

/**
 * Update Bulletins Bulk.
 *
 * @param {*} data
 * @returns {Promise}
 */
export function updateBulletinsBulk(data) {
  const updateBulletinsBulkUrl = urlConstants.apiBaseUrl + '/bulletins/bulk';

  return new Promise(resolve => {
    const result = httpUtil.put(updateBulletinsBulkUrl, data);

    resolve(result);
  });
}

/**
 * Validate Admin.
 *
 * @param {*} data
 * @returns {Promise}
 */
export function validateAdmin(data) {
  const { googleLoginUrl } = urlConstants;

  const valiDateAdminUrl = googleLoginUrl;

  return new Promise(resolve => {
    const result = httpUtil.post(valiDateAdminUrl, data);

    resolve(result);
  });
}

/**
 * Log Out.
 *
 * @returns {Promise}
 */
export async function logOut() {
  const logoutUrl = urlConstants.apiBaseUrl + '/logout';
  const refreshToken = localStorage.getItem('refreshToken');
  const data = {
    authorization: 'Bearer ' + refreshToken
  };

  return new Promise(resolve => {
    const result = httpUtil.remove(logoutUrl, data);

    resolve(result);
  });
}

/**
 * Filter Active List.
 *
 * @param {*} list
 * @returns {Promise}
 */
export function filterActiveList(list) {
  const activeList = filter(list, item => item.activeStatus);

  return orderBy(activeList, 'priority', 'asc');
}

/**
 * Reassign Bulletin Priorities.
 *
 * @param {*} oldIndex
 * @param {*} newIndex
 * @param {*} list
 * @returns {Promise}
 */
export function reassignBulletinPriorities(oldIndex, newIndex, list) {
  const newList = cloneDeep(list);

  const newPriority = newList[newIndex].priority;

  if (oldIndex > newIndex) {
    for (let i = newIndex; i < oldIndex; i++) {
      newList[i].priority = newList[i + 1].priority;
    }
    newList[oldIndex].priority = newPriority;
  } else {
    for (let i = newIndex; i > oldIndex; i--) {
      newList[i].priority = newList[i - 1].priority;
    }
    newList[oldIndex].priority = newPriority;
  }

  return newList;
}
