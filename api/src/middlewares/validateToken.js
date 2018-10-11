import Boom from 'boom';

import * as CONSTANT from '../const';
import Session from '../models/session';

export default function validateRefreshToken(req, res, next) {
  req.token = req.body.authorization.substring(CONSTANT.BEARER_LENGTH);

  new Session({
    refresh_token: req.token
  })
    .fetch()
    .then(data => {
      if (!data) {
        throw new Boom.notFound('Token Not Found');
      }
      next();
    })
    .catch(err => next(err));
}
