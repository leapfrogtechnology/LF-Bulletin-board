import * as httpUtil from '../utils/httpUtil';

const USER_NAME = 'pratishshr';
const REPO_NAME = 'react-starter';

const API_BASE_URL = 'https://api.github.com';
const RESOURCE_CONTRIBUTERS = `${API_BASE_URL}/repos/${USER_NAME}/${REPO_NAME}/contributors`;

export function fetchContributers() {

  return httpUtil.get(RESOURCE_CONTRIBUTERS);
}


