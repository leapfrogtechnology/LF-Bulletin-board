import Boom from 'boom';

import Session from '../models/session';

/**
 * Creates new session for new login.
 *
 * @param {*} userParams
 * @returns {Promise}
 */
export function createSession(userParams) {
  return new Session({
    user_id: userParams.user.id,
    username: userParams.user.name,
    refresh_token: userParams.tokens.refreshToken
  })
    .save()
    .then(Session => Session.refresh());
}

/**
 * Deletes Session after logout.
 *
 * @param {*} refreshToken
 * @returns
 */
export function deleteSession(refreshToken) {
  return new Session({ refresh_token: refreshToken }).fetch().then(session => {
    if (!session) {
      throw new Boom.notFound('Session not found');
    }

    session.destroy();
  });
}
