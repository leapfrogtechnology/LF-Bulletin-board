import regex from '../constants/regex';
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
    fetchInterval = fetchInterval ? fetchInterval : textConstants.DEFAULT_FETCH_INTERVAL;
  } catch (err) {
    fetchInterval = textConstants.DEFAULT_FETCH_INTERVAL;
  }

  return fetchInterval * 1000 * 60;
}

/**
 * Get link based on visibility.
 *
 * @param {*} link
 * @param {*} visibility
 * @param {*} startHiddenSlide
 * @returns
 */
export function getLink(link, visibility, startHiddenSlide) {
  if (!link) {
    return '';
  }

  let newLink = link;

  if (visibility || startHiddenSlide) {
    if (newLink.search('docs.google.com') > -1) {
      if (newLink.includes('start=false')) {
        newLink = newLink.replace('start=false', 'start=true');
      }
    } else if (newLink.match(regex.YOUTUBE_REGEX) !== null) {
      if (newLink.includes('autoplay=0')) {
        newLink = newLink.replace('autoplay=0', 'autoplay=1');
      }
      if (newLink.includes('mute=0')) {
        newLink = newLink.replace('mute=0', 'mute=1');
      }
    }
  } else {
    if (newLink.search('docs.google.com') > -1) {
      if (newLink.includes('start=true')) {
        newLink = newLink.replace('start=true', 'start=false');
      }
    } else if (newLink.match(regex.YOUTUBE_REGEX) !== null) {
      if (newLink.includes('autoplay=1')) {
        newLink = newLink.replace('autoplay=1', 'autoplay=0');
      }
      if (newLink.includes('mute=1')) {
        newLink = newLink.replace('mute=1', 'mute=0');
      }
    }
  }

  return newLink;
}
