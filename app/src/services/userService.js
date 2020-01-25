/* eslint-disable require-await */
import * as httpUtil from '../utils/httpUtil';
import urlConstants from '../constants/urlConstants';

/**
 * Add User.
 *
 * @param {*} data
 * @returns {Promise}
 */
export async function addUser(data) {
  const addUserUrl = urlConstants.apiBaseUrl + '/users';

  return new Promise(resolve => {
    const result = httpUtil.post(addUserUrl, data);

    resolve(result);
  });
}

/**
 * List All Users.
 *
 * @returns {Promise}
 */
export async function listAllUsers() {
  const listAllUsersUrl = urlConstants.apiBaseUrl + '/users';
  const result = await httpUtil.get(listAllUsersUrl, {});

  return result;
}

/**
 * Delete User.
 *
 * @param {*} userId
 * @returns {Promise}
 */
export async function deleteUser(userId) {
  const deleteUserUrl = urlConstants.apiBaseUrl + '/users/' + userId;

  return new Promise(resolve => {
    const result = httpUtil.remove(deleteUserUrl);

    resolve(result);
  });
}

/**
 * Edit User.
 *
 * @param {*} userId
 * @param {*} data
 * @returns {Promise}
 */
export async function editUser(userId, data) {
  const editBulletinUrl = urlConstants.apiBaseUrl + '/users/' + userId;

  return new Promise(resolve => {
    const result = httpUtil.put(editBulletinUrl, data);

    resolve(result);
  });
}
