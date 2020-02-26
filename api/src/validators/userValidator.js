import Joi from 'joi';

import { userRoles } from '../const';
import validate from '../utils/validate';
import * as userService from '../services/userService';

const SCHEMA = {
  email: Joi.string()
    .email()
    .label('email')
    .max(50)
    .required(),
  userRole: Joi.string()
    .valid(userRoles.admin, userRoles.superAdmin)
    .label('userRole')
    .max(50)
    .required()
};

/**
 * Check user exists.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @returns {Promise}
 */
function checkUserExistsByEmail(req, res, next) {
  return userService
    .fetchByEmail(req.query.email)
    .then(userObj => {
      req.userObj = userObj;

      return next();
    })
    .catch(err => next(err));
}

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @returns {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator, checkUserExistsByEmail };
