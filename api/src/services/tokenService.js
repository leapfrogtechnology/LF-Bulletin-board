import * as jwt from '../utils/jwt';

/**
 * Generate both Access Token and Refresh Token.
 *
 * @param {*} id
 * @returns {Promise}
 */
export function generateTokens(id) {
  return jwt.generateTokens(id);
}

/**
 * Verify Access Token.
 *
 * @param {*} accessToken
 * @returns {Promise}
 */
export function verifyAccessToken(accessToken) {
  return jwt.verifyAccessToken(accessToken);
}

/**
 * Verify Refresh Token.
 *
 * @param {*} refreshToken
 * @returns {Promise}
 */
export async function verifyRefreshToken(refreshToken) {
  const decodedToken = await jwt.verifyRefreshToken(refreshToken);

  return jwt.generateAccessToken(decodedToken.encryptedData);
}
