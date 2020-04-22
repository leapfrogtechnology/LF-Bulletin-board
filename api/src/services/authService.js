import Boom from 'boom';

import User from '../models/user';

import * as tokenService from './tokenService';
import * as sessionService from './sessionService';

/**
 * Login Users.
 *
 * @param {*} loginParams
 * @returns {Object}
 */
export async function loginUser(loginParams) {
  try {
    const userDetails = await verifyUser(loginParams);

    const { id, username } = userDetails.toJSON();
    const tokens = tokenService.generateTokens(id);
    const userInfo = {
      user: {
        id,
        username
      },
      tokens
    };

    await sessionService.createSession(userInfo);

    return userInfo;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

/**
 * Log Out User.
 *
 * @param {*} id
 * @returns {Promise}
 */
export function logoutUser(id) {
  return sessionService.deleteSession(id);
}

/**
 * Verify Users.
 *
 * @param {*} loginParams
 * @returns {Promise}
 */
export function verifyUser(loginParams) {
  return new User({
    username: loginParams.username,
    password: loginParams.password
  })
    .fetch()
    .then(user => {
      if (!user) {
        throw new Boom.notFound('User not found');
      }

      return user;
    });
}
