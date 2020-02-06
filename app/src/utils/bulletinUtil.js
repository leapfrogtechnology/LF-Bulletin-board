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

/**
 * Get LocalStorage Parsed Object with validation.
 *
 * @returns User Object || NULL.
 */
export function getUserLocalStorageData() {
  try {
    const localStorageUser = localStorage.getItem('user') || null;
    const user = JSON.parse(localStorageUser);

    if (user && user.email) {
      return user;
    } else {
      throw new Error('User Data Not Found');
    }
  } catch (err) {
    return null;
  }
}
