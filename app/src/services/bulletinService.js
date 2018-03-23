import * as httpUtil from '../utils/httpUtil';
import urlConstants from '../constants/urlConstants';

export function checkLogin(data) {
  let loginUrl = urlConstants.baseUrl + '/login';
  return httpUtil.post(loginUrl, data);
}

