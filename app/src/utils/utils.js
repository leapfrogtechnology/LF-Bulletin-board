import textConstants from '../constants/textConstants';

/**
 * Get Error Message With Error Handling.
 *
 * @param {Object} error
 * @returns
 */
export function getErrorMessage(error) {
  console.error('Error Occurred', error);
  let errorMessage = 'Server Error Occurred';

  try {
    if (error.response && error.response.data) {
      if (error.response.data.error && error.response.data.error.message) {
        errorMessage =
          error.response.data.error.message === textConstants.EMPTY_JSON
            ? textConstants.GOOGLE_AUTH_KEY_ERROR_MESSAGE
            : error.response.data.error.message;
      } else if (error.response.data.details) {
        errorMessage = error.response.data.error.details[0].message;
      } else {
        errorMessage = String(error.response.data);
      }
    }
  } catch (e) {
    console.error('Error Getting Data', e);
  }

  return errorMessage;
}

/**
 * Get Bulletin Fetch Interval in MilliSeconds.
 *
 * @returns {Number}
 */
export function getBulletinFetchInterval() {
  let fetchInterval = null;

  try {
    fetchInterval = Math.abs(parseInt(process.env.REACT_APP_BULLETIN_FETCH_INTERVAL));
  } catch (err) {
    fetchInterval = 15;
  }

  return fetchInterval * 1000 * 60;
}
