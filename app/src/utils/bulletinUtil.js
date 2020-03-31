import routeConstants from '../constants/routeConstants';

import defaultImage from '../assets/images/logo_leapfrog.svg';

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

/**
 * Add Iframe Background Image.
 *
 */
export function addIframeBackgroundImage() {
  const iframeHolderDiv = document.getElementsByClassName('iframe-holder')[0];

  iframeHolderDiv.style.background = "url('" + defaultImage + "') center center no-repeat";
  iframeHolderDiv.style.backgroundSize = '50%';
}

/**
 * Remove Iframe Background Image.
 *
 */
export function removeIframeBackgroundImage() {
  const iframeHolderDiv = document.getElementsByClassName('iframe-holder')[0];

  iframeHolderDiv.style.background = 'none';
  iframeHolderDiv.style.backgroundSize = 'none';
}

const dummyBulletinSegment = {
  url: '',
  duration: 0,
  title: '',
  index: 0,
  show: false
};

/**
 * Get Bulletin List With First And Second Frame Selected.
 *
 * @param {*} [bulletinList=[]]
 * @returns {Object}
 */
export function getBulletinList(bulletinList = []) {
  const bulletinListLength = bulletinList.length;

  let selectedData = {};

  if (bulletinListLength === 0) {
    addIframeBackgroundImage();

    selectedData = {
      firstSelectedLink: dummyBulletinSegment,
      secondSelectedLink: dummyBulletinSegment,
      chosenDuration: 0,
      activeBulletinTitle: 'Leapfrog Bulletin'
    };
  } else if (bulletinListLength === 1) {
    removeIframeBackgroundImage();

    selectedData = {
      firstSelectedLink: {
        url: bulletinList[0].url,
        duration: bulletinList[0].duration,
        title: bulletinList[0].title,
        index: 0,
        show: true
      },
      secondSelectedLink: dummyBulletinSegment,
      chosenDuration: bulletinList[0].duration,
      activeBulletinTitle: bulletinList[0].title
    };
  } else {
    removeIframeBackgroundImage();

    selectedData = {
      firstSelectedLink: {
        url: bulletinList[0].url,
        duration: bulletinList[0].duration,
        title: bulletinList[0].title,
        index: 0,
        show: true
      },
      secondSelectedLink: {
        url: bulletinList[1].url,
        duration: bulletinList[1].duration,
        title: bulletinList[1].title,
        index: 1,
        show: false
      },
      chosenDuration: bulletinList[0].duration,
      activeBulletinTitle: bulletinList[0].title
    };
  }

  selectedData = {
    ...selectedData,
    dataCollection: bulletinList
  };

  return selectedData;
}
