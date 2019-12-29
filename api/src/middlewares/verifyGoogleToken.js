import HttpStatus from 'http-status-codes';
import * as googleAuth from 'google-auth-library';

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
    const client = new googleAuth.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let data;
    let token = req.body.tokenId;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
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
    throw err;
  }
}
