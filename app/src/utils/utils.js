import textConstants from '../constants/textConstants';

/**
 * Get Error Message With Error Handling.
 *
 * @param {Object} error
 * @returns
 */
export function getErrorMessage(error) {
  console.error('Error Occured', error);
  let errorMessage = 'Server Error Occured';

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
