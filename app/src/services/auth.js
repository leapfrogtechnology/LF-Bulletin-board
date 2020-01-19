import * as httpUtil from '../utils/httpUtil';
import urlConstants from '../constants/urlConstants';

/**
 * Check Login.
 *
 * @returns {Promise}
 */
export async function checkLogin() {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const validateUserUrl = urlConstants.apiBaseUrl + '/validateuser' + '?email=' + user.email;
  const result = await httpUtil.get(validateUserUrl, {});

  return result;
}
