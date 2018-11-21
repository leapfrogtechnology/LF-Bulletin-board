import routeConstants from '../constants/routeConstants';

export function logout () {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  window.location.href = routeConstants.LOGIN;
}
