import Boom from 'boom';
import jwt from 'jsonwebtoken';

const CONFIG = require('../config.json');

/**
 * Generate both Access Token and Refresh Token.
 *
 * @param {*} userData
 * @returns {Promise}
 */
export function generateTokens(userData) {
  return {
    accessToken: generateAccessToken(userData),
    refreshToken: generateRefreshToken(userData)
  };
}

/**
 * Generate Access Token.
 *
 * @param {*} data
 * @returns {Promise}
 */
export function generateAccessToken(data) {
  return jwt.sign({ encryptedData: data }, CONFIG.ACCESS_TOKEN_SALT, {
    expiresIn: CONFIG.ACCESS_EXPIRY_TIME
  });
}

/**
 * Generate Refresh Token.
 *
 * @param {*} data
 * @returns {Promise}
 */
export function generateRefreshToken(data) {
  return jwt.sign(
    {
      encryptedData: data
    },
    CONFIG.REFRESH_TOKEN_SALT,
    {
      expiresIn: CONFIG.REFRESH_EXPIRY_TIME
    }
  );
}

/**
 * Verify Access Token.
 *
 * @param {*} token
 * @returns {Promise}
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, CONFIG.ACCESS_TOKEN_SALT, (err, decode) => {
    if (!err) {
      return Promise.resolve(decode);
    } else {
      return Promise.reject(Boom.unauthorized('Access Token Unauthorized'));
    }
  });
}

/**
 * Verify Refresh Token.
 *
 * @param {*} token
 * @returns {Promise}
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, CONFIG.REFRESH_TOKEN_SALT, (err, decode) => {
    if (!err) {
      return decode;
    } else {
      throw Boom.unauthorized('Refresh Token Unauthorized');
    }
  });
}
