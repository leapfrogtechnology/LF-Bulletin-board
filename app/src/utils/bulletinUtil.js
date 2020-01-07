import routeConstants from '../constants/routeConstants';

/**
 * Logout User and Remove Data from Browser Storage.
 *
 */
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  window.location.href = routeConstants.LOGIN;
}
