import HttpStatus from 'http-status-codes';
import * as googleAuth from 'google-auth-library';

const OAuth2Client = new googleAuth.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET);

/**
 * Validate the users' google id using google-auth-library.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {function} next
 *
 */
export default async function validateGoogleToken(req, res, next) {
  try {
    const ticket = await OAuth2Client.verifyIdToken({ idToken: req.body.tokenId });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    let data;

    if (payload) {
      data = {
        id: userId,
        name: payload.name,
        email: payload.email
      };
      req.user = data;

      return next();
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'Unauthorized access'
    });
  } catch (err) {
    console.error(err);

    throw err;
  }
}
