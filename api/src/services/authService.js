import Boom from 'boom';

import User from '../models/user';
import * as tokenService from './tokenService';
import * as sessionService from './sessionService';

/**
 * Login Users
 * 
 * @param {*} loginParams 
 * @return {Object}
 */
export async function loginUser(loginParams) {
  try {
    let userDetails = await verifyUser(loginParams);

    let { id, username } = userDetails.toJSON();
    let tokens = tokenService.generateTokens(id);
    let userInfo = {
      user: {
        id,
        username
      },
      tokens
    };

    await sessionService.createSession(userInfo);

    return userInfo;
  } catch (err) {
    throw err;
  }
}

/**
 * Log Out User
 * 
 * @param {*} id
 * @return {Promise} 
 */
export function logoutUser(id) {
  return sessionService.deleteSession(id);
}

/**
 * Verify Users
 * @param {*} loginParams 
 * @return {Promise}
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
