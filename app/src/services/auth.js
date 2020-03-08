import * as httpUtil from '../utils/httpUtil';
import { getUserLocalStorageData } from '../utils/bulletinUtil';

import urlConstants from '../constants/urlConstants';

/**
 * Check Login.
 *
 * @returns {Promise}
 */
export async function checkLogin() {
  const user = getUserLocalStorageData();

  if (user) {
    const validateUserUrl = `${urlConstants.apiBaseUrl}/validateuser?email=${user.email}`;
    const result = await httpUtil.get(validateUserUrl, {});

    return result;
  }

  return null;
}
